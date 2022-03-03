export default function StateInfo({ state }) {
	return (
		<>
			<h2>{state.name}</h2>
			<p>Capitol: {state.capitol}</p>
			<p>
				{state.description}{' '}
				<a href={state.wikipedia} target='_blank' rel='noreferrer'>
					Wikipedia
				</a>
			</p>
		</>
	)
}
