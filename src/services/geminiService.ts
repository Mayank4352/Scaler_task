export const getAIResponse = async (leetCodeUrl: string, question: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        problemUrl: leetCodeUrl, 
        userQuestion: question 
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.answer || "No response from AI.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error fetching response. Please try again later.";
  }
};