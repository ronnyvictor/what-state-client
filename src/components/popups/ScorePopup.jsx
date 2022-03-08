import checkIcon from '../../assets/check-icon.svg'
import xIcon from '../../assets/x-icon.svg'

export default function ScorePopup({
	score,
	setScore,
	setStates,
	states,
	setActiveState,
	activeState,
	setStateProps,
	stateProps,
	setActiveIndex,
	initialColor,
	input,
	setAnswer,
	setPreviousState,
	setIsCorrect,
	previousState
}) {
	const handleTryAgain = () => {
		setAnswer('')
		setScore(0)
		setStates(states.sort(() => Math.random() - 0.5))
		setActiveIndex(0)
		setActiveState(states[0])
		setStateProps(initialColor)
		setPreviousState()
		setIsCorrect()
		input.current.focus()
	}

	const result = {
		score: score,
		userId: '1',
		states: states
			? states.map(state => {
					return {
						name: state.name,
						abbreviation: state.abbreviation,
						correct: stateProps[state.abbreviation].correct,
					}
			  })
			: null,
	}

	const handleSend = () => {
		fetch('http://localhost:3003/scores', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(result),
		})
		handleTryAgain()
	}

	// console.log(result)

	return (
		<>
			{!activeState && previousState ? (
				<div className='box'>
					<div className='score-card'>
						<p>You got {score} out of 50 states correct!</p>
						<button onClick={handleTryAgain}>Try Again</button>
						<button onClick={handleSend}>Send</button>
						<div className="state-results-outer">
							{states ? (
								states.map(state => {
									return (
										<div className='state-results-inner' key={state.id}>
											<a href={state.wikipedia} target='_blank' rel='noreferrer'>{state.name}</a>
											{stateProps[state.abbreviation].correct ? (
												<div className='correct-incorrect'>
													<img src={checkIcon} alt='check icon' />
												</div>
											) : (
												<div className='correct-incorrect'>
													<img src={xIcon} alt='x icon' />
												</div>
											)}
										</div>
									)
								})
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
