export default function ScorePopup({
	score,
	setScore,
	setStates,
	states,
	setActiveState,
	activeState,
	setStateColor,
	stateColor,
	setActiveIndex,
	activeIndex,
	inactive,
}) {
	const handleTryAgain = () => {
		// setAnswer('')
		setScore(0)
		setStates(states.sort(() => Math.random() - 0.5))
		setActiveIndex(0)
		setActiveState(states[activeIndex])
		setStateColor({
			...stateColor,
			[activeState.abbreviation]: activeState.colors.active,
		})
		// console.log(states)
	}

	// console.log(activeState)

	return (
		<>
			{!activeState ? (
				<div className='box'>
					<div className='score-card'>
						<p> You scored {score} out of 50!</p>
						<button onClick={handleTryAgain}>Try Again</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
