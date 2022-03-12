import checkIcon from '../../assets/check-icon.svg'
import xIcon from '../../assets/x-icon.svg'

export default function ResultsPopup({
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
	answerInput,
	setAnswer,
	setPreviousState,
	setIsCorrect,
	previousState,
	user,
	setHsPopup,
	hsPopup,
	handleGoogleLogin,
	setAttempts,
	setUserScores,
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
		setAttempts(0)
		answerInput.current.focus()
	}

	const result = {
		score: score,
		userId: user ? user.uid : null,
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
		setHsPopup(true)
		fetch('http://what-state-rv.uk.r.appspot.com/scores', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(result),
		}).then(
			fetch(`http://what-state-rv.uk.r.appspot.com/scores/${user.uid}`)
				.then(res => res.json())
				.then(data => setUserScores(data))
				.catch(console.error)
		)
	}

	return (
		<>
			{!activeState && previousState && !hsPopup ? (
				<div className='box'>
					<div className='score-card'>
						<p>You got {score} out of 50 states correct!</p>
						<h2>{score * 2}%</h2>
						<button onClick={handleTryAgain}>Try Again</button>
						{!user ? (
							<button onClick={handleGoogleLogin}>Sign in</button>
						) : (
							<button onClick={handleSend}>Save Your Score</button>
						)}

						<div className='state-results-outer'>
							{states ? (
								states.map(state => {
									return (
										<div className='state-results-inner' key={state.id}>
											<a
												href={state.wikipedia}
												target='_blank'
												rel='noreferrer'
											>
												{state.name}
											</a>
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
