import { useRef } from 'react'

export default function HighScoresPopup({
	userScores,
	user,
	hsPopup,
	setHsPopup,
	answerInput,
	setUserScores,
}) {
	const elemRef = useRef(null)
	const dragProps = useRef()

	const initialiseDrag = event => {
		const { target, clientX, clientY } = event
		const { offsetTop, offsetLeft } = target
		const { left, top } = elemRef.current.getBoundingClientRect()

		dragProps.current = {
			dragStartLeft: left - offsetLeft,
			dragStartTop: top - offsetTop,
			dragStartX: clientX,
			dragStartY: clientY,
		}
		window.addEventListener('mousemove', startDragging, false)
		window.addEventListener('mouseup', stopDragging, false)
	}

	const startDragging = ({ clientX, clientY }) => {
		elemRef.current.style.transform = `translate(${
			dragProps.current.dragStartLeft + clientX - dragProps.current.dragStartX
		}px, ${
			dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY
		}px)`
	}

	const stopDragging = () => {
		window.removeEventListener('mousemove', startDragging, false)
		window.removeEventListener('mouseup', stopDragging, false)
	}

	return (
		<>
			{hsPopup ? (
				<div className='box'>
					<div ref={elemRef} className='score-card container'>
						<div onMouseDown={initialiseDrag}>
							<button
								onClick={() => {
									setHsPopup(false)
									answerInput.current.focus()
								}}
							>
								X
							</button>
							{userScores && userScores.length ? (
								userScores
									.sort((a, b) => b.score - a.score)
									.map(userScore => {
										return (
											<div className='hs-info' key={userScore.id}>
												<p>{userScore.score * 2}%</p>
												<p>{userScore.score}/50</p>
												<p>
													{new Date(
														userScore.timestamp._seconds * 1000
													).toLocaleDateString('en-US', {
														month: '2-digit',
														day: '2-digit',
														year: 'numeric',
													})}
												</p>
												<p>
													{new Date(
														userScore.timestamp._seconds * 1000
													).toLocaleTimeString('en-US', {
														hour: '2-digit',
														minute: '2-digit',
													})}
												</p>
												<button
													onClick={() => {
														fetch(
															`http://what-state-rv.uk.r.appspot.com/scores/${userScore.id}`,
															{
																method: 'PATCH',
															}
														).then(
															fetch(
																`http://what-state-rv.uk.r.appspot.com/scores/${user.uid}`
															)
																.then(res => res.json())
																.then(data => setUserScores(data))
																.catch(console.error)
														)
													}}
												>
													Delete
												</button>
											</div>
										)
									})
							) : (
								<div>
									<p>You haven't saved any scores.</p>
								</div>
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
