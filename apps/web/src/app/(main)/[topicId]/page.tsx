"use client"
import { topicsConfig } from '@/lib/topics-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import styles from './topic-page.module.css';

interface TopicPageProps {
  params: { topicId: string };
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = topicsConfig.find((t) => t.id === params.topicId);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [output, setOutput] = useState<string>('');

  if (!topic) return notFound();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setOutput("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
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
        <button type="submit" className={styles.button}>Generate</button>
      </form>
      <div className={styles.output}>
        <h2 className={styles.outputHeading}>Heading</h2>
        <div className={styles.outputContent}>{output || 'Generated Content'}</div>
      </div>
    </main>
  );
} 