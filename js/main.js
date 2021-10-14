let questionList = [];

const fetchQuestion = async () => {
  try {
    const res = await axios.get(
      "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions"
    );
    questionList = res.data;
    return questionList;
    //console.log(questionList);
  } catch (err) {
    console.log(err);
  }
};
fetchQuestion();

const renderQuestion = () => {
  let htmlContent = "";
  //C1: using for in
  // for (let i in questionList) {
  //   htmlContent += questionList[i].render(Number(i) + 1);
  // }
  //C2: using for of
  for (let [index, value] of questionList.entries()) {
    htmlContent += value.render(Number(index) + 1);
  }
  // console.log(htmlContent);
  document.getElementById("questionsContainer").innerHTML = htmlContent;
};

const mapData = (data) => {
  let questionArray = data.map((item) => {
    if (item.questionType == 1) {
      let { questionType, id, content, answers } = item;
      let newItem = new MultipleChoice(questionType, id, content, answers);
      return newItem;
    } else {
      let { questionType, id, content, answers } = item;
      let newItem = new FillInBlank(questionType, id, content, answers);
      return newItem;
    }
  });
  return questionArray;
};

const submit = () => {
  let result = 0;
  for (let item of questionList) {
    if (item.checkExact() == true) {
      result++;
    }
  }
  alert("Result: " + result + "/" + questionList.length);
};
fetchQuestion()
  .then((res) => {
    questionList = mapData(res);
    renderQuestion();
  })
  .catch((err) => {
    console.log(err);
  });
