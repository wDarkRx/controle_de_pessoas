// Seleção de elementos
const alunoForm = document.querySelector("#formulario");
const alunoInput = document.querySelector("#formulario-submit-input");
const alunoList = document.querySelector("#aluno-list");
const alunosCount = document.querySelector("#alunos-count");
const checkboxes = document.querySelectorAll('input[name="membro"]');

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

// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const valorInput = alunoInput.value;

  if (valorInput) {
    const membrosSelecionados = Array.from(document.querySelectorAll('input[name="membro"]:checked')).map(
      (checkbox) => checkbox.value
    );
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
  }
});

updateAlunosCount();
