import Draggable from 'react-draggable'

import checkIcon from '../../assets/check-icon.svg'
import xIcon from '../../assets/x-icon.svg'

export default function ResultsPopup({
	score,
	setScore,
	setStates,
	states,
	setActiveState,
	setStateProps,
	stateProps,
	setActiveIndex,
	initialColor,
	answerInput,
	setAnswer,
	setPreviousState,
	setIsCorrect,
	user,
	handleGoogleLogin,
	setAttempts,
	setLoading,
	resultPopup,
	setResultPopup,
	hsPopup,
}) {
	const handleTryAgain = () => {
		setAnswer('')
		setScore(0)
		setStates(states.sort(() => Math.random() - 0.5))
		setActiveIndex(0)
		setActiveState(states[0])
		setStateProps(initialColor)
		setIsCorrect()
		setAttempts(0)
		setResultPopup(false)
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
		fetch('http://what-state-rv.uk.r.appspot.com/scores', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(result),
		})
			.then(() => setLoading(true))
			.catch(console.error)
	}

	return (
		<>
			{resultPopup && !hsPopup ? (
				<div className='box'>
					<Draggable handle='.handle'>
						<section className='score-card'>
							<div className='handle'>
								<button
									onClick={() => {
										setResultPopup(false)
									}}
								>
									X
								</button>
							</div>
							<p>You got {score} out of 50 states correct!</p>
							<h2>{score * 2}%</h2>
							<button onClick={handleTryAgain}>Try Again</button>
							{!user ? (
								<button onClick={handleGoogleLogin}>
									Sign In to Save Your Score
								</button>
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
						</section>
					</Draggable>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
