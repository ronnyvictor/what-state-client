import { useEffect, useState } from 'react'

export default function Form() {
	const [form, setForm] = useState('')
	return (
		<>
			<h1>What State Is This?</h1>
			<form>
				<input type='text' />
				<br />
				<a href='/'>Skip</a>
			</form>
		</>
	)
}
