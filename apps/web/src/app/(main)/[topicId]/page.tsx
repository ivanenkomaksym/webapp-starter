"use client"
import { topicsConfig } from '@/lib/topics-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import styles from './topic-page.module.css';
import ReactMarkdown from 'react-markdown';

interface TopicPageProps {
  params: { topicId: string };
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = topicsConfig.find((t) => t.id === params.topicId);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!topic) return notFound();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleGenerate(e: React.FormEvent) {
    if (!topic) return;
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: topic.id, params: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setOutput(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>&larr; Back</Link>
      <h1 className={styles.heading}>{topic.label}</h1>
      <p className={styles.description}>{topic.description}</p>
      <form onSubmit={handleGenerate} className={styles.form}>
        {topic.inputParams.map((param) => (
          <div key={param.id} className={styles.formGroup}>
            <label htmlFor={param.id} className={styles.label}>
              {param.label}{!param.optional && <span className="text-destructive">*</span>}
            </label>
            {param.type === 'bool' ? (
              <input
                id={param.id}
                name={param.id}
                type="checkbox"
                checked={!!form[param.id]}
                onChange={e => setForm(prev => ({ ...prev, [param.id]: e.target.checked }))}
                className={styles.checkbox}
              />
            ) : (
              <input
                id={param.id}
                name={param.id}
                type={param.type === 'int' ? 'number' : 'text'}
                required={!param.optional}
                value={typeof form[param.id] === 'string' ? form[param.id] as string : ''}
                onChange={handleChange}
                className={styles.input}
              />
            )}
          </div>
        ))}
        <button type="submit" className={styles.button} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
      </form>
      {output && (
        <div className={styles.output}>
          <div className={styles.chatContainer}>
            {/* Optionally, show user input as a bubble */}
            {/* <div className={`${styles.chatBubble} ${styles.user}`}>{userInput}</div> */}
            <div className={`${styles.chatBubble} ${styles.ai}`}>
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 