import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";

export function Home() {
	const [todo, setTodo] = useState([]);
	const toDoListUrl = "https://assets.breatheco.de/apis/fake/todos/user/carlos984";

	function addTodo(e) {
		let input = document.querySelector("input").value;
		console.log(input);
		if (e.key === "Enter" && input != "") {
			let newTodos = [...todo, { label: input, done: false }];
			setTodo(newTodos);
			document.querySelector("input").value = "";
			console.log(todo);
			fetch(toDoListUrl, {
				method: "PUT",
				body: JSON.stringify(newTodos),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(resp => {
				return resp.json();
			});
		}
	}

	function deleteTodo(elementIndex) {
		var filtered = todo.filter(function(value, i) {
			return elementIndex !== i;
		});
		setTodo(filtered);
		fetch(toDoListUrl, {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(resp => {
			return resp.json();
		});

		console.log(filtered);
	}

	function getTodos() {
		fetch(toDoListUrl, { method: "GET" })
			.then(response => response.json())
			.then(responseJSON => {
				setTodo(responseJSON);
				console.log(responseJSON);
			});
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container">
			<div className="row justify-content-start header">
				<h1 className="col-10 title">TODO List</h1>
				<div className="col-2 list">
					<p>{todo.length} pending tasks</p>
				</div>
			</div>
			<div className="row justify-content-start">
				<div className="col-12">
					<input
						type="text"
						onKeyPress={e => {
							addTodo(e);
						}}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<ul>
						{todo.map((value, index) => (
							<li className="list-group-item" key={index}>
								{value.label}
								<button type="button" onClick={event => deleteTodo(index)}>
									<i className="fas fa-trash-alt" />
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
