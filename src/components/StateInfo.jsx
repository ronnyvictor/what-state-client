export default function StateInfo({ state, activeState, isCorrect }) {
	return (
		<>
			{/* <h2>{state.name}</h2>
			<p>Capitol: {state.capitol}</p>
			<p>
				{state.description}{' '}
				<a href={state.wikipedia} target='_blank' rel='noreferrer'>
					Wikipedia
				</a>
			</p> */}
			{/* {activeState.name === state.name ? (
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
			) : (
				<></>
			)} */}
			{isCorrect === false && undefined ? (
				<></>
			) : activeState.name === state.name ? (
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
			) : (
				<></>
			)}
		</>
	)
}
