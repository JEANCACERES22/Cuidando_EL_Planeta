const questions = [
    {
        question: "¿Qué aparatos electrónicos tienes en casa?",
        type: "checkbox",
        options: [
            "Refrigerador", "Horno de microondas", "Computadora", "Laptop",
            "Consola de videojuegos", "Estéreo", "Televisión", "Lavadora",
            "Secadora de ropa", "Lavatrastes", "Aspiradora", "Aire acondicionado", "Ventiladores"
        ]
    },
    {
        question: "En mi domicilio utilizo:",
        type: "radio",
        options: ["Gas natural", "Gas LP"]
    },
    {
        question: "En mi casa los focos son:",
        type: "radio",
        options: ["LED", "Ahorradores", "Incandescentes", "No lo sé"]
    },
    {
        question: "¿Cómo te transportas para ir al trabajo o a la escuela?",
        type: "checkbox",
        options: ["Auto", "Autobus", "Bicicleta", "Combi", "Metro", "Metrobus", "Motocicleta", "Voy caminando"]
    },
    {
        question: "¿En cuánto tiempo haces ese recorrido?",
        type: "radio",
        options: [
            "Menos de 10 minutos", "Entre 10 y 20 minutos", "Entre 20 y 40 minutos",
            "Entre 40 minutos y 1 hora", "Una hora y media", "Más de dos horas", "Más de tres horas"
        ]
    },
    {
        question: "¿Con qué frecuencia vuelas en avión?",
        type: "radio",
        options: [
            "Viajero frecuente, más de dos vuelos internacionales y dos nacionales al año.",
            "Aproximadamente un vuelo (ida y vuelta) internacional al año.",
            "Más de un vuelo (ida y vuelta) nacional al año.",
            "Aproximadamente un vuelo (ida y vuelta) nacional al año.",
            "No suelo volar."
        ]
    },
    {
        question: "¿Con qué frecuencia comes carne de res, cerdo, pollo o pescado?",
        type: "radio",
        options: ["Diario", "4-6 días a la semana", "1-3 días a la semana", "No consumo"]
    },
    {
        question: "¿Con qué regularidad utilizas plásticos de un solo uso?",
        type: "radio",
        options: ["Diario", "De vez en cuando - 1 vez por semana", "Rara vez", "No uso plástico"]
    },
    {
        question: "La ropa que utilizo:",
        type: "radio",
        options: [
            "Siempre es nueva y de importación.", "Siempre es nueva y nacional.",
            "De segunda mano.", "La reparo y reutilizo."
        ]
    },
    {
        question: "¿Cada cuánto cambias tus dispositivos electrónicos?",
        type: "checkbox",
        options: [
            "Celular cada 6 meses", "Celular cada año", "Celular de 2-3 años", "Más de 3 años",
            "No tengo este dispositivo"
        ]
    }
  ];
  
  let currentQuestionIndex = 0;
  const answers = {};
  let carbonScore = 0;
  
  function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
  
    const question = questions[currentQuestionIndex];
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = question.question;
    questionContainer.appendChild(questionTitle);
  
    question.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = question.type;
        input.name = `question-${currentQuestionIndex}`;
        input.value = option;
  
        label.appendChild(input);
        label.append(option);
        questionContainer.appendChild(label);
    });
  }
  
  function nextQuestion() {
    const inputs = document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`);
    if (questions[currentQuestionIndex].type === "radio") {
        const selected = Array.from(inputs).find(input => input.checked);
        if (selected) answers[currentQuestionIndex] = selected.value;
    } else if (questions[currentQuestionIndex].type === "checkbox") {
        answers[currentQuestionIndex] = Array.from(inputs)
            .filter(input => input.checked)
            .map(input => input.value);
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
  }
  
  function showResults() {
    const resultsDiv = document.getElementById("results");
    const resultsText = document.getElementById("resultsText");
  
    const electronics = answers[0] || [];
    carbonScore += electronics.length * 50;
  
    if (answers[1] === "Gas LP") carbonScore += 150;
  
    if (answers[2] === "Incandescentes") carbonScore += 100;
    else if (answers[2] === "Ahorradores") carbonScore += 50;
  
    const transport = answers[3] || [];
    transport.forEach(mode => {
        if (mode === "Auto") carbonScore += 200;
        else if (mode === "Autobus") carbonScore += 100;
        else carbonScore += 50;
    });
  
    if (answers[4] === "Más de tres horas") carbonScore += 200;
  
    const flightFrequency = answers[5];
    if (flightFrequency === "Viajero frecuente, más de dos vuelos internacionales y dos nacionales al año.") carbonScore += 400;
  
    const meatFrequency = answers[6];
    if (meatFrequency === "Diario") carbonScore += 300;
  
    const plasticUse = answers[7];
    if (plasticUse === "Diario") carbonScore += 100;
  
    const clothing = answers[8];
    if (clothing === "Siempre es nueva y de importación.") carbonScore += 100;
  
    resultsText.innerHTML = `<strong>Tu huella de carbono estimada es:</strong> ${carbonScore} kg CO2 al año.`;
    resultsDiv.style.display = "block";
    document.querySelector(".container").style.display = "none";
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    carbonScore = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    document.getElementById("results").style.display = "none";
    document.querySelector(".container").style.display = "block";
    loadQuestion();
  }
  
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Reporte de Huella de Carbono", 10, 10);
  
    let yOffset = 20;
    doc.setFontSize(12);
  
    Object.keys(answers).forEach((key, index) => {
        const question = questions[key].question;
        const response = Array.isArray(answers[key]) ? answers[key].join(", ") : answers[key];
        
        doc.text(`${index + 1}. ${question}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Respuesta: ${response || "No respondido"}`, 10, yOffset);
        yOffset += 10;
  
        if (yOffset > 270) {
            doc.addPage();
            yOffset = 10;
        }
    });
  
    yOffset += 10;
    doc.setFontSize(14);
    doc.text("Resultados", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.text(`Tu huella de carbono estimada es: ${carbonScore} kg CO2 al año.`, 10, yOffset);
  
    doc.save("Reporte_Huella_Carbono.pdf");
  }
  
  loadQuestion();
  