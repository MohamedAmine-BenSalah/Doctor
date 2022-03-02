import React from "react";
import axios from "axios";
import './contact.css'
import BlogComponent from "./BlogComponent";
import { Link, useNavigate } from "react-router-dom"
export default class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      blogArr: [],
      texte: "",
      img: "",
      createdAt: "",

    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/doctor/api/selectBlogs')
      .then(response => {
        console.log(response.data)
        this.setState({
          blogArr: response.data,
        })
      })
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }
  addBlog = blog => {
    let newBlog = [blog, ...this.state.blogArr];
    this.setState({
      blogArr: newBlog,
    })
  };

  uploadImg = files => {
    let formData = new FormData;
    formData.append("file", files[0]);
    formData.append('upload_preset', "whnlss8f");
    axios.post("https://api.cloudinary.com/v1_1/dcpnqg5fy/image/upload", formData)
      .then(response => {
        console.log(response.data.secure_url);
        this.setState({
          img: response.data.secure_url,
        }, () => {
          console.log(this.state)
        })
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.addBlog({
      title: this.state.title,
      texte: this.state.texte,
      img: this.state.img,

    })
    axios.post('http://localhost:3000/doctor/api/postBlogs', this.state);
    console.log(this.state)
  }

  render() {
    return (
      <div className="parent">
        {/* <div className="div1">
          <form onSubmit={this.handleSubmit} >
            <div><input name="title" value={this.state.title} onChange={this.handleChange} /></div>
            <div><textarea name="texte" value={this.state.texte} onChange={this.handleChange} /></div>
            <div><input onChange={(e) => {
              this.uploadImg(e.target.files)
            }} type="file" /></div>
            <button type="submit" onClick={this.handleSubmit} >add blog</button>
            <div>{this.state.blogArr.map(blog => {
              return (
                <BlogComponent blog={blog} key={blog.texte} />
              )
            })}</div>
          </form>
        </div> */}

        <div className="div1 center">
          <form id="contact-form" className="form" onSubmit={this.handleSubmit}>
            <br /><br /><br /><br />
            <h1>Post Blogs</h1>
            <br />
            <h5>Share with us medical informations.</h5>
            <br />
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Content</label>
              <textarea className="form-control" rows="15" name="texte" value={this.state.texte} onChange={this.handleChange}></textarea>
            </div>
            <label htmlFor="message">Image</label>
            <br />
            <div>

              <input onChange={(e) => {
                this.uploadImg(e.target.files)
              }} type="file" />
            </div>
            <br />
            <button type="submit" className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Submit</button>
            <div>{this.state.blogArr.map(blog => {
              return (
                <BlogComponent blog={blog} key={blog.texte} />
              )
            })}</div>
          </form>
        </div>

        <div className="div2">
          <div class="wrapper">
            <div class="sidebar">
              <div class="profile">
                <img src="https://media.discordapp.net/attachments/936015556287528980/947614190263210035/cc93f1595f4ec18589d585e5d9910c2f.jpg?width=473&height=473" alt="profile_picture" />
                <h3>Dr Mortadha</h3>
                <p>Dentist</p>
              </div>
              <ul>
                <li>
                  <Link to="/Calendar">
                    <span className="item">Calendar</span>
                  </Link>
                </li>
                <li>
                  <Link to="/PostBlog">
                    <span className="item">Post blogs</span>
                  </Link>
                </li>
                <li>
                  <a >
                    <span className="item">Blogs</span>
                  </a>
                </li>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <li>
                  <Link to="/contactUs">
                    <span className="item">contact us</span>
                  </Link>
                </li>
                <li>
                  <a>
                    <span className="item">Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}