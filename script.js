const checkBoxList = document.querySelectorAll(".checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const showError = document.querySelector(".error-label");
const showMsg = document.querySelector(".Completed-msg");
const progressValue = document.querySelector(".progress-value");
const mode = document.querySelector(".mode");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
const totalGoals = inputFields.length;
let completedGoals = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.firstElementChild.innerHTML = `${completedGoals}/${totalGoals} completed`;
progressValue.style.width = `${(completedGoals / totalGoals) * 100}%`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allFieldsFilled = [...inputFields].every((input) => input.value);

    if (allFieldsFilled) {
      checkbox.parentElement.classList.toggle("Completed");

      const inputId = checkbox.nextElementSibling.id;
      if (allGoals[inputId]) {
        allGoals[inputId].completed = !allGoals[inputId].completed;
        completedGoals = Object.values(allGoals).filter(
          (goal) => goal.completed
        ).length;
        progressValue.style.width = `${(completedGoals / 3) * 100}%`;
        progressValue.firstElementChild.innerHTML = `${completedGoals}/3 completed`;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        if (completedGoals === 3) {
          showMsg.style.display = "block";
        } else {
          showMsg.style.display = "none";
        }
      }
    } else {
      showError.style.display = "block";
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("Completed");
    }
  }

  input.addEventListener("focus", () => {
    showError.style.display = "none";
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: allGoals[input.id]?.completed || false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

var theme = 0;
mode.addEventListener("click", () => {
  if (theme === 0) {
    document.body.style.backgroundColor = "#000000";

    theme = 1;
  } else {
    document.body.style.backgroundColor = "#F2F8ED";

    theme = 0;
  }
});
