# SQL Morph Table

SQL Morph Table is a web-based utility designed to convert SQL `CREATE TABLE` statements into visual schema representations. It facilitates the quick generation of database diagrams for documentation, development, and presentation purposes.

## Core Features

- **SQL Schema Parsing**: Automatically extracts field names, data types, sizes, and constraints (PK, FK, AI, NULL/NOT NULL) from SQL statements.
- **Image Export**: Generates high-resolution PNG exports of the rendered tables using client-side rendering.
- **Visual Customization**:
    - Configurable header color schemes and manual hex code input.
    - Adjustable typography settings including font family and size for headers and body.
    - Custom canvas background color for exports.
- **User Interface**:
    - Integrated dark and light theme support.
    - Responsive design for cross-device compatibility.
    - Real-time rendering of style modifications.

## Usage Instructions

1. **Input**: Provide a valid SQL `CREATE TABLE` statement in the input field.
2. **Process**: Select **Visualize Schema** to parse the input and generate the table.
3. **Customize**: Modify styling parameters via the control sidebar.
4. **Export**: Select **Download PNG** to save the visualization.

## Technical Specifications

- **Frontend**: Standard-compliant HTML5 and CSS3 (Vanilla).
- **Logic**: JavaScript (ES6+) for parsing and DOM manipulation.
- **Dependencies**: [html2canvas](https://html2canvas.hertzen.com/) for image synthesis.
- **Assets**: Google Fonts integration for typography options.

---
Developed by **Satriatech** (2026).
Database Icon by Xnix pro via [Icon-Icons.com](https://icon-icons.com/authors/1521-xnix-pro).