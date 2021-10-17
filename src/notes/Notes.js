import React, { Component } from 'react'
import NotesDao from '../database/NotesDao';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default class Notes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notes: [],
             newNoteTitle: "",
             newNoteDesc: "",
             noteToUpdate: {},
             insertingNote: true,
             search: "",
             validNote: true,
             color: ""
        }
    }

    loadNotes = () => {
        NotesDao.getInstance().getAll()
            .then( result => {
                this.setState({notes: result});
            });
    }

    componentDidMount() {
        this.loadNotes();
        this.changeColor("bg-light text-dark");
    }

    newNoteTitleChange = (event) => {
        this.setState({newNoteTitle: event.target.value})
    }

    newNoteDescChage = (event) => {
        this.setState({newNoteDesc: event.target.value})
    }

    searchChange = (event) => {
        this.setState({search: event.target.value})
    }

    changeColor = (color) => {
        this.setState({color: color})
    }

    addNewNote = () => {
        this.setState({validNote: true});
        let note = {name: this.state.newNoteTitle, desc: this.state.newNoteDesc, color: this.state.color};
        NotesDao.getInstance().insert(note)
            .then( result => {
                this.loadNotes();
            });
    }

    editNote = () => {
        this.setState({validNote: true});
        let note = this.state.noteToUpdate;
        note.name = this.state.newNoteTitle;
        note.desc = this.state.newNoteDesc;
        note.color = this.state.color;
        NotesDao.getInstance().update(note)
            .then( result => {
                this.loadNotes();
            });
    }

    deleteNote = (id) => {
        NotesDao.getInstance().delete(id)
            .then( result => {
                this.loadNotes();
            });
    }


    
    render() {
        return (
            <div className="row d-flex justify-content-center">
                <div className="my-2 col-md-10 p-2">
                    <h3 className="text-center d-lg-none">Simple Notes App</h3>
                    <hr className="d-lg-none"/>
                    <div className="d-flex gap-2">
                        <div className="col-1 col-lg-3">
                            <Tippy content="New note">
                                <button type="button" className="btn btn-secondary" onClick={() => this.setState({insertingNote: true, newNoteTitle: "", newNoteDesc: "", validNote: true})} data-bs-toggle="modal" data-bs-target="#newNoteModal"><i className="bi bi-plus-lg"></i></button>
                            </Tippy>
                        </div>
                        <div className="d-flex col-10 col-lg-6 justify-content-center">
                            <div className="col-lg-8 col-sm-6">
                                <input className="form-control bg-dark text-white" type="text" placeholder="Search" onChange={this.searchChange}/>
                            </div>
                        </div>
                        <div className="d-none d-lg-block col-1 col-lg-3 pt-1"><h4 className="text-center">Simple Notes App</h4></div>
                    </div>
                    <hr />
                    <div className="modal fade" id="newNoteModal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="newNoteModalLabel">{this.state.insertingNote ? "New Note" : "Edit Note"}</h5>
                                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="note-name" className="col-form-label">Title:</label>
                                            <input value={this.state.newNoteTitle} onChange={this.newNoteTitleChange} type="text" className="form-control bg-dark text-white" id="note-name" placeholder="Note to self..."/>
                                            {!this.state.validNote ? <label className="text-danger form-text"> * Required</label> : <div></div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description-text" className="col-form-label">Description:</label>
                                            <textarea value={this.state.newNoteDesc} onChange={this.newNoteDescChage} className="form-control bg-dark text-white" id="description-text"></textarea>
                                        </div>
                                        <label htmlFor="choose-color" className="col-form-label">Note color:</label>
                                        <div className="d-flex gap-2" id="choose-color">
                                            <input type="radio" className="btn-check" name="options-outlined" id="primary-outlined" autoComplete="off" onClick={() => this.changeColor("bg-primary text-white")}/>
                                            <label className="btn btn-outline-primary" htmlFor="primary-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="secondary-outlined" autoComplete="off" onClick={() => this.changeColor("bg-secondary text-white")}/>
                                            <label className="btn btn-outline-secondary" htmlFor="secondary-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" onClick={() => this.changeColor("bg-success text-white")}/>
                                            <label className="btn btn-outline-success" htmlFor="success-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" onClick={() => this.changeColor("bg-danger text-white")}/>
                                            <label className="btn btn-outline-danger" htmlFor="danger-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="warning-outlined" autoComplete="off" onClick={() => this.changeColor("bg-warning text-dark")}/>
                                            <label className="btn btn-outline-warning" htmlFor="warning-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="info-outlined" autoComplete="off" onClick={() => this.changeColor("bg-info text-dark")}/>
                                            <label className="btn btn-outline-info" htmlFor="info-outlined"><i className="bi bi-palette"></i></label>
                                            <input type="radio" className="btn-check" name="options-outlined" id="light-outlined" autoComplete="off" onClick={() => this.changeColor("bg-light text-dark")} defaultChecked/>
                                            <label className="btn btn-outline-light" htmlFor="light-outlined"><i className="bi bi-palette"></i></label>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {this.state.newNoteTitle !== "" ?
                                        <button type="button" className="btn btn-success" id="note-submit-button" onClick={() => {this.state.insertingNote ? this.addNewNote() : this.editNote()}} data-bs-dismiss="modal">{this.state.insertingNote ? "Add" : "Save"}</button>
                                    :   <button type="button" className="btn btn-success" id="note-submit-button" onClick={() => {this.setState({validNote: false})}}>{this.state.insertingNote ? "Add" : "Save"}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.notes && this.state.notes.map( (note) => {
                            if((note.name.toLowerCase().search(this.state.search.toLowerCase()) !== -1) || (note.desc.toLowerCase().search(this.state.search.toLowerCase()) !== -1)) {
                                return <div key={note.id} className="col-md-4 col-sm-6 my-2">
                                    <div className={"card " + note.color}>
                                        <div className="card-body">
                                            <h5 className="card-title">{note.name}</h5>
                                            <p className="card-text">{note.desc}</p>
                                                <div className="d-flex flex-row gap-2 justify-content-end">
                                                    <Tippy content="Edit note">
                                                        <button className={"btn btn-sm " + note.color} type="button" onClick={() => {
                                                                this.setState({noteToUpdate: note, newNoteTitle: note.name, newNoteDesc: note.desc, color: note.color, insertingNote: false});
                                                            }} data-bs-toggle="modal" data-bs-target="#newNoteModal">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                    </Tippy>
                                                    <Tippy content="Delete note">
                                                        <button className={"btn btn-sm " + note.color} type="button" onClick={() => this.deleteNote(note.id)}><i className="bi bi-trash"></i></button>
                                                    </Tippy>
                                                </div> 
                                        </div>
                                    </div>  
                                </div>
                            } else {
                                return <div key={note.id}></div>
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
