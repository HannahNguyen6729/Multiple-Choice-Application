class MultipleChoice extends Question {
  constructor(type, id, content, answers) {
    super(type, id, content, answers);
  }

  render(index) {
    let answerHTML = "";
    for (let item of this.answers) {
      answerHTML += `
        <div>
          <input value="${item.id}" class="answer - ${this.id}" type="radio" name="answer - ${this.id} ">
          <label class="lead">  ${item.content} </label>
        </div>
      `;
    }

    return `
    <div>
      <p class = "lead font-italic" style = "font-size: 30px;">
        Question ${index}: ${this.content}
      </p>
      ${answerHTML}
    </div>
    `;
  }

  //checkExact() {}
  checkExact() {
    const checkList = document.getElementsByClassName(`answer - ${this.id}`);
    let answerId;
    for (let item of checkList) {
      if (item.checked) {
        //get id of answer through attribute: value="${item.id}"
        answerId = item.value;
      }
    }
    if (!answerId) {
      return false;
    }
    for (let answer of this.answers) {
      if (answer.id == answerId) {
        return answer.exact;
      }
    }
    return false;
  }
}
