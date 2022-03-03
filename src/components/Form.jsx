import { useState } from 'react'
import StateInfo from './StateInfo'

export default function Form({ setColor, state }) {
	const [isCorrect, setIsCorrect] = useState()
	const [answer, setAnswer] = useState('')

	const onChange = event => {
		setAnswer(event.target.value)
	}

	// const state = { name: 'Alabama' }

	const handleSubmit = event => {
		event.preventDefault()
		if (answer.toLowerCase() === state.name.toLowerCase()) {
			setAnswer('')
			setIsCorrect(true)
			setColor('green')
			console.log('Correct!')
			// go to new state
		} else {
			setIsCorrect(false)
			setColor('red')
			console.log('Incorrect!')
		}
	}

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		console.log('Incorrect!')
		// go to new state
	}

	return (
		<div>
			<h1>What State Is This?</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Press enter to submit'
					onChange={onChange}
					value={answer}
				/>
			</form>
			<button onClick={handleSkip}>Skip</button>
			{(isCorrect === true) ? <StateInfo state={state} /> : <div></div> }
			{/* <StateInfo state={state} /> */}
		</div>
	)
}
