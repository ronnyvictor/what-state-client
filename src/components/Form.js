import { useState } from 'react'

export default function Form() {
	const [form, setForm] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	const onChange = (event) => {
		setForm(event.target.value)
	}

	return (
		<section>
			<h1>What State Is This?</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Press enter to submit'
					onChange={onChange}
					value={form}
				/>
				<br />
				<a href='/'>Skip</a>
			</form>
		</section>
	)
}
