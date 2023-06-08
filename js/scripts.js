// Seleção de elementos
const alunoForm = document.querySelector("#formulario");
const alunoInput = document.querySelector("#formulario-submit-input");
const alunoList = document.querySelector("#aluno-list");
const alunosCount = document.querySelector("#alunos-count");
const checkboxes = document.querySelectorAll('input[name="membro"]');
const chartCanvas = document.querySelector("#chart");

let chart;

// Funções
const saveAluno = (text, membros) => {
  const aluno = document.createElement("div");
  aluno.classList.add("aluno");

  const alunoNome = document.createElement("h3");
  alunoNome.innerText = text;
  aluno.appendChild(alunoNome);

  const alunoMembros = document.createElement("p");
  alunoMembros.innerText = "Membros: " + membros.join(", ");
  aluno.appendChild(alunoMembros);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-aluno");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  aluno.appendChild(deleteBtn);

  alunoList.appendChild(aluno);

  alunoInput.value = "Aluno ";
  alunoInput.focus();

  updateAlunosCount();
  updateChart();
};

const updateAlunosCount = () => {
  const totalAlunos = alunoList.children.length;
  alunosCount.textContent = `Total de Alunos: ${totalAlunos}`;
};

const desmarcarCheckbox = () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const updateChart = () => {
  const alunos = alunoList.children;
  const musculosCount = {};

  // Contar a quantidade de cada músculo selecionado
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    const membrosText = aluno.querySelector("p").innerText;
    const membros = membrosText.substring(9).split(", ");

    for (let j = 0; j < membros.length; j++) {
      const membro = membros[j];
      if (musculosCount[membro]) {
        musculosCount[membro]++;
      } else {
        musculosCount[membro] = 1;
      }
    }
  }

  // Atualizar os dados do gráfico de pizza
  const musculos = Object.keys(musculosCount);
  const countData = musculos.map((membro) => musculosCount[membro]);

  if (chart) {
    chart.data.labels = musculos;
    chart.data.datasets[0].data = countData;
    chart.update();
  } else {
    const ctx = chartCanvas.getContext("2d");
    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: musculos,
        datasets: [
          {
            data: countData,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#8d5ad1",
              "#3cba9f",
              "#e8c3b9",
              "#c45850"
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
};

// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const valorInput = alunoInput.value;

  if (valorInput) {
    const membrosSelecionados = Array.from(
      document.querySelectorAll('input[name="membro"]:checked')
    ).map((checkbox) => checkbox.value);
    if (membrosSelecionados.length === 0) {
      alert("Selecione pelo menos um grupo muscular");
      return;
    }
    saveAluno(valorInput, membrosSelecionados);
    desmarcarCheckbox();
  }
});

document.addEventListener("click", (e) => {
  const elementoAlvo = e.target;
  const elementoPai = elementoAlvo.closest(".aluno");

  if (elementoPai && elementoAlvo.classList.contains("remove-aluno")) {
    elementoPai.remove();
    updateAlunosCount();
    updateChart();
  }
});

updateAlunosCount();
updateChart();
