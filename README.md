## Overview

The Project Generator is a web-based tool that generates full-stack projects according to your needs. You can select your preferred tech stack, including frontend frameworks, backend technologies, databases, and styling options. The tool then creates a structured project setup for you.

This project is powered by the **DeepSeek model** through **Groq**, which helps in dynamically generating the project structure based on your input.

## Features

- Generates a full-stack project tailored to your selections.
- Supports various frontend, backend, and database technologies.
- Provides a file explorer to navigate through generated files.
- Displays a live code preview for selected files.
- Utilizes AI to generate structured project files.
- Allows users to download the entire generated project as a ZIP file.

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Next.js API routes
- **AI Model:** DeepSeek via Groq API
- **State Management:** React Hooks (useState, useEffect)
- **HTTP Client:** Axios
- **File Handling:** file-saver, JSZip

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/project-generator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project-generator
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up the environment variable:
   - Create a `.env.local` file in the root directory.
   - Add the following line:
     ```sh
     GROQ_API_KEY=your_api_key_here
     ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Enter a description of the project structure you want.
2. Select your preferred tech stack, including frontend, backend, and database.
3. Click the "Generate" button.
4. The tool will create a project structure based on your input.
5. Browse the generated files in the file explorer and view their content in the preview panel.
6. Download the complete project as a ZIP file using the provided download option.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
