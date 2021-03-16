import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";

export function Home() {
	// const [todo, setTodo] = useState([]);
	// const [inputValue, setInputValue] = useState("");

	// function handleChange(event) {
	// 	setInputValue(event.target.value);
	// }

	// const handleKeyPress = event => {
	// 	if (event.key === "Enter" && inputValue != "") {
	// 		// const newTodo = todo;
	// 		// newTodo.push(value);
	// 		// setTodo(newTodo);
	// 		setTodo([...todo, inputValue]);
	// 		console.log("handleKeyPress");
	// 		setInputValue("");
	// 	}
	// };

	// function deleteRow(index, event) {
	// quiero borrar una tarea y quiero identificar qué tarea en específico quiero "borrar", también necesitamos imprimir el nuevo array, sin ese todo que borramos.
	// for(let i=0; i<todo.length; i++) Victor me pregunta por qué lo quiero recorrer
	// 	let newTodo = [...todo]; //aquí copio mi array para utilizarlo con el splice más cómodo
	// 	let removed = newTodo.splice(index, 1); //nos devuelve un array de los elementos eliminados, me da el que eliminé
	// 	setTodo(newTodo); //se hace el setTodo del nuevo array, sino saldría el array antes del splice
	// }
	// el useeffect lo necesito para el primer GET ALL (eso es lo que me va a traer los valores de la lista predeterminados o ya agregados)

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
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});

			console.log(todo);
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
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
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
		<div className="text-center mt-5">
			<div className="row w-100">
				<div className="col-md-12">
					<h1 className="display-2">Tibis TO DO List</h1>

					<div className="input container input-group mx-auto">
						<input
							type="text"
							onKeyPress={e => {
								addTodo(e);
							}}
						/>
					</div>
					<div className="list container">
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
						<div className="text-muted pb-1">
							<p>{todo.length} to do</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Nos hace falta añadir value en todo y que se agregue ese input cada vez que apretamos enter 	<ul>{todo.map(value)=>(<li>{value}</li>)}</ul>
// se declara la variable const con un "value" que se cambia al aplicar "setValue", por eso se usa use state
//setTodo(todo
// en el handler no necesitas retornar nada, en ningun lado coloques return.
// Los eventos se colocan sin return, se utilizan con handle<event>
//useEffect está presente cuando hay efectos colaterales (se establece un valor), React busca dispararlo siempre, programación funcional. Efecto secundario: cada vez que cambias una variable SIEMPRE.
// setTodo([...todo, value]); linea 18 a 21 javascript moderno
// falta el evento de eliminar
