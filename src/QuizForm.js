import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { quizApi } from './action';

class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: '',
    };
  }

  renderInputField = ({ input, label, type, meta: { touched, error } }) => (<div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>);

  renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (<div>
    <label>{label}</label>
    <div>
      <textarea {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>);

  renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (<div>
    <label>{label}</label>
    <div>
      <select {...input} >
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>);

  renderSelectQuestionTypeField = ({ input, label, type, meta: { touched, error }, children }) => (<div>
    <label>{label}</label>
    <div>
      <select {...input} >
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>);

  renderTextAnswers = ({ fields, question, meta: { error } }) => (<ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Javob qo'shish</button>
    </li>
    {fields.map((answer, index) => (<li key={index}>
      <button
        type="button"
        title="Javobni olib tashlash"
        onClick={() => fields.remove(index)}
      />
      <Field
        name={answer}
        type="text"
        component={this.renderInputField}
        label={`Javob #${index + 1}`}
      />
    </li>))}
    <li>
      <Field
        name={`${question}.correctAnswer`}
        component={this.renderSelectField}
        label="To'g'ri javob"
      >
        <option value="">Iltimos, to'g'ri javobni tanlang</option>
        {fields.map((answer, index) => (<option key={index + 1} value={index + 1}>{`Javob #${index + 1}`}</option>))}
      </Field>
    </li>

    {error && <li className="error">{error}</li>}
  </ul>);


  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (<ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Savol qo'shish</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((question, index) => (<li key={index}>
      <button
        type="button"
        title="Savolni olib tashlash"
        onClick={() => fields.remove(index)}
      />
      <h4>Savol #{index + 1}</h4>
      <Field
        name={`${question}.question`}
        type="text"
        component={this.renderInputField}
        label="Savol sarlavhasi"
      />
      <Field
        name={`${question}.questionType`}
        component={this.renderSelectQuestionTypeField}
        label="Savol turi"
      >
        <option value="">Iltimos, savol turini tanlang</option>
        <option value="text">Matn</option>
        <option value="photo">Rasm</option>
      </Field>
      <FieldArray name={`${question}.answers`} component={this.renderTextAnswers} question={question} />
      <Field
        name={`${question}.messageForCorrectAnswer`}
        type="text"
        component={this.renderTextareaField}
        label="To'g'ri javob uchun xabar"
      />
      <Field
        name={`${question}.messageForIncorrectAnswer`}
        type="text"
        component={this.renderTextareaField}
        label="Noto'g'ri javob uchun xabar"
      />
      <Field
        name={`${question}.explanation`}
        type="text"
        component={this.renderTextareaField}
        label="Tushuntirish"
      />
      <Field
        name={`${question}.point`}
        type="number"
        component={this.renderInputField}
        label="Point"
      />
    </li>))}
  </ul>);


  render() {

    const { handleSubmit, pristine, reset, submitting, courses, user, quizApi } = this.props;


    return (<div className="QuizForm">
      <form name="quiz-form" onSubmit={handleSubmit}>


        <Field
          name="quizTitle"
          type="text"
          component={this.renderInputField}
          label="Savolnoma sarlavhasi"
        />
        <Field
          name="quizSynopsis"
          type="text"
          component={this.renderTextareaField}
          label="Savolnoma mazmuni"
        />
        <FieldArray name="questions" component={this.renderQuestions} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          {/*<button type="button" disabled={pristine || submitting} onClick={reset}>*/}
          {/*  Clear Values*/}
          {/*</button>*/}
        </div>
      </form>
    </div>);
  }
}

QuizForm = reduxForm({
  form: 'quizForm', validate,
})(QuizForm);

const selector = formValueSelector('quizForm');

QuizForm = connect(state => {
  const user = state.user;
  const courses = state.getCourses;
  const questions = selector(state, 'questions');
  const questionType = questions && questions.map(question => question.questionType);

  return { questionType: questionType, courses, user };
}, { quizApi })(QuizForm);


export default QuizForm;