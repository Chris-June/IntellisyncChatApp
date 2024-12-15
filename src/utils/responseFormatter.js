/**
 * Formats the AI response text with markdown and styling
 * @param {string} text - The raw response text from the AI
 * @returns {string} - The formatted response text
 */
export const formatAIResponse = (text) => {
  // Replace **text** with bold styling
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace *text* with italic styling
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace `code` with code styling
  text = text.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Replace --- with horizontal rule
  text = text.replace(/\n---\n/g, '<hr/>');
  
  // Format code blocks
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    return `<pre><code class="language-${language || 'text'}">${code.trim()}</code></pre>`;
  });
  
  // Format lists
  text = text.replace(/^\s*[-*]\s(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Format numbered lists
  text = text.replace(/^\s*(\d+)\.\s(.+)$/gm, '<li>$2</li>');
  text = text.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
  
  // Add paragraph tags to text blocks
  text = text.split('\n\n').map(paragraph => {
    if (!paragraph.startsWith('<') && paragraph.trim()) {
      return `<p>${paragraph.trim()}</p>`;
    }
    return paragraph;
  }).join('\n');
  
  // Format links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return text;
};
