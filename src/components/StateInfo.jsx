export default function StateInfo({ state, activeState, isCorrect }) {
	return (
			<>
				{activeState ? (
					<>
						<h2>{activeState.name}</h2>
						<p>Capitol: {activeState.capitol}</p>
						<p>
							{activeState.description}{' '}
							<a href={activeState.wikipedia} target='_blank' rel='noreferrer'>
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
