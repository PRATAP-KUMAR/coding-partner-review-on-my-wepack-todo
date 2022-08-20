const updateCheckbox = (checkbox) => {
  if (checkbox.checked) {
    checkbox.nextElementSibling.classList.add('strike-through');
  } else {
    checkbox.nextElementSibling.classList.remove('strike-through');
  }
};

export default updateCheckbox;