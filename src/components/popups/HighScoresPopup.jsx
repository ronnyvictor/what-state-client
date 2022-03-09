import { useRef } from 'react'

import checkIcon from '../../assets/check-icon.svg'
import xIcon from '../../assets/x-icon.svg'

export default function HighScoresPopup({
	userScores,
	user,
	hsPopup,
	setHsPopup,
	answerInput,
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

	const handleDelete = () => {
			userScores.map(userScore => {
				return(
					fetch(`http://localhost:3003/scores/${userScore.id}`, {method: 'DELETE'})
					.then(console.log('success!'))
					.catch(console.error)
				)
			})
	}

	return (
		<>
			{hsPopup ? (
				<div className='box'>
					<div
						ref={elemRef}
						onMouseDown={initialiseDrag}
						className='score-card container'
					>
						<div>
							<button
								onClick={() => {
									setHsPopup(false)
									answerInput.current.focus()
								}}
							>
								X
							</button>
							{userScores && userScores.length > 0
								? userScores
										.sort((a, b) => b.score - a.score)
										.map(userScore => {
											return (
												<div key={userScore.id}>
													<p>Score: {userScore.score}</p>
													<p>{userScore.date}</p>
													<p>{userScore.time}</p>
													<button onClick={handleDelete}>Delete</button>
													{userScore.states.map(state => {
														return (
															<div key={state.abbreviation}>
																<div className='correct-incorrect'>
																	{state.correct ? (
																		<div>
																			<img src={checkIcon} alt='check icon' />
																		</div>
																	) : (
																		<div className='correct-incorrect'>
																			<img src={xIcon} alt='x icon' />
																		</div>
																	)}
																	<p>{state.abbreviation}</p>
																</div>
															</div>
														)
													})}
												</div>
											)
										})
								: <div>
									<p>No scores yet</p>
									</div>}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
