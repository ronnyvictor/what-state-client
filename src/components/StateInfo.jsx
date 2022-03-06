export default function StateInfo({ state, previousState, isCorrect }) {
	return (
			<>
				{previousState ? (
					<>
						<h2>{previousState.name}</h2>
						<p>Capitol: {previousState.capitol}</p>
						<p>
							{previousState.description}{' '}
							<a href={previousState.wikipedia} target='_blank' rel='noreferrer'>
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
