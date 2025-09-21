# LegalBoi – AI Legal Assistant

**LegalBoi** is an AI-powered tool that simplifies complex legal documents into clear, accessible guidance. It helps users understand contract clauses, assess risks, and get personalized advice via an interactive chatbot.

---

## **Project Overview**

Legal documents like rental agreements, employment contracts, and loan agreements are often filled with confusing jargon. Most people struggle to understand them, which can lead to financial or legal risks. **LegalBoi** bridges this gap by providing:

- Clause-by-clause summaries  
- Risk assessment indicators  
- Recommendations and alternative wording  
- Chatbot interaction for user queries  

---

## **Features**

- Upload PDFs, DOC/DOCX, or TXT files containing legal contracts  
- Clause extraction and summarization powered by **Google Vertex AI**  
- Interactive **chatbot powered by Gemini API** for clarifying clauses  
- Highlighted clause risk levels (Low, Medium, High) with intuitive icons  
- Hamburger menu for navigating uploaded documents  
- Responsive UI built with **React.js** and **Tailwind CSS**  

---

## **Technologies Used**

**Frontend:**  
- React.js → Web app interface (upload page, clause view, chatbot)  
- Tailwind CSS → Styling and responsive layout  
- Lucide Icons → Risk indicators and navigation icons  

**Backend & AI Processing:**  
- Node.js / Express.js → File upload, processing, and API server  
- JWT (JSON Web Tokens) → Secure authentication  
- Google Vertex AI → Clause extraction and summarization  
- Google Gemini API → Chatbot for clause explanation  

**Storage & Database:**  
- Firebase Storage → Store uploaded PDF/DOCX files  
- Firebase Firestore → Store clause metadata, user sessions, and chat history  
 

**Other Tools:**  
- PDF.js / Docx Parser → Extract text from uploaded contracts  
- LangChain / Prompt Engineering (optional) → Improved AI context handling  

---

## **How It Works**

1. User uploads a legal document on the **Upload Page**.  
2. Backend stores the file in **Firebase Storage**.  
3. **Vertex AI** extracts clauses and summarizes them.  
4. Summarized clauses and metadata are stored in **Firestore**.  
5. User navigates the clause list (left panel) and interacts with **LegalBoi chatbot** (right panel) for Q&A.  
6. Chatbot uses **Gemini API** to provide clear answers.  

---

## **Demo Screenshots / Wireframes**

- **Upload Page:** Drag-and-drop or choose file  
- **Analysis Page:** Left panel → clause list | Right panel → chatbot interaction  
- Hamburger menu for navigating multiple uploaded documents  

*(Add screenshots or wireframes here)*  

---

## **Setup & Installation**

1. Clone the repository:  
```bash
git clone https://github.com/yourusername/legalboi.git
cd legalboi
npm install
npm run dev

