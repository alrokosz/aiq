export const pdf = {
  model: 'gpt-3.5-turbo',
  temperature: 0,
  messages: [
    {
      role: 'assistant',
      content:
        'You will be creating flashcards for a user based on the input they provide. Please generate 5 questions with 5 answers. Proide the respknse in JSON format. Similiar to this example [{"question": "...", "answer": "..."}]}',
    },
    {
      role: 'user',
      content: `I have a document I would like to create flashcards from. Please create 5 questions and 5 answers from the document provided. Focus on Names and dates. Ignore the table of contents and the anything about the author of the document.`,
    },
  ],
}
