# Generative consultant

Service that helps use AI more efficiently. Don't bother writing down all necessary details, claryfing on each individual step. Simply put the topic name and/or industry to generate an e-mail, or do a market research, or write a compeling product description.

On the main page user is presented with tiles in grid-like fashion with following topics: Email Writing, Market Research, Education & Learning, etc. Once user clicks on a tile, a new page opens with correspondiong to topic input parameters, optional and mandatory. If it's an Email Writing, then it's two simple input fields: topic and industry. User enters input parameters, clicks Generate, and is given a response back.

# Features

1. Add configuration for topics. Each topic has an id, label, input parameters. Input parameter has an id, label, type (string, int, bool), optional/mandatory flag.
2. Add main page in tile-like fashion to visualize all the topics.
3. Add components for each topic. Component will represent the UI for the input parameters of the topic. If topic has 2 input string parameters, it will contain 2 sets of title text + text input.
4. All components share the same Generate + Output text controls. Extract it into shared component. For now, after clicking Generate, put some random text in the output box
5. Each page must have a back button to main page.