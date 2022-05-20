import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { quizApi } from './action';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class QuizFormResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false, selectedCourse: '',
    };
  }

  render() {
    const { result, courses, user, quizApi } = this.props;
    // const navigate = useNavigate();
    const style = {
      resultBox: {
        background: '#e1f5fe', minHeight: 260, padding: 20, margin: 20,
      }, button: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        borderRadius: '5px',
        padding: '10px 15px',
        margin: '0 0 20px 20px',
        fontSize: '20px',
        color: '#fff',
        backgroundImage: 'linear-gradient(#4f93ce,#285f8f)',
        border: '1px solid #285f8f',
        cursor: 'pointer',
      },
    };

    const coursesFilter = courses.filter(item => item.owner === user._id);
    const id = this.state.selectedCourse;
    const quiz = result;

    const submitFunc = () => {
      const formdate = new FormData();

      formdate.append('quiz', quiz);

      quizApi(formdate, id);
      // navigate('/');

    };

    return (<div className="QuizFormResult">
      {result != null ? (<div>

          <div style={{
            width: '50%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FormControl fullWidth required sx={{ mb: '20px' }}>
              <InputLabel id="demo-simple-select-label">Courses</InputLabel>
              {coursesFilter.length > 0 ? <Select
                placeholder="status"
                id="demo-simple-select"
                value={this.state.selectedCourse}
                label="Courses"
                onChange={(e) => this.setState({ selectedCourse: e.target.value })}
              >
                {coursesFilter.map((item, idx) => {
                  return (<MenuItem key={idx} value={item._id}>{item.title}</MenuItem>);
                })}


              </Select> : <Typography> Not found category. Please once add category. </Typography>}
            </FormControl>
            <button type="button" className="btn btn-primary" onClick={submitFunc}>Submit</button>
          </div>
          <div style={style.resultBox}>
            <pre> {result} </pre>
          </div>
          <div>
            <CopyToClipboard text={result}
                             onCopy={() => this.setState({ copied: true })}>
              <button style={style.button}>Copy to Clipboard</button>
            </CopyToClipboard>

          </div>

        </div>


      ) : (null)}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.getCourses, user: state.user,
  };
};

export default connect(mapStateToProps, { quizApi })(QuizFormResult);