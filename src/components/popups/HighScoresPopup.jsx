import { useState } from 'react'
import Draggable from 'react-draggable'
import DeletePopup from './DeletePopup'

export default function HighScoresPopup({
	userScores,
	hsPopup,
	setHsPopup,
	answerInput,
	setLoading,
}) {
	const [popup, setPopup] = useState({
		show: false,
		id: null,
	})

	const handleDelete = id => {
		setPopup({
			show: true,
			id,
		})
	}

	const handleDeleteFalse = () => {
		setPopup({
			show: false,
			id: null,
		})
	}

	const handleDeleteTrue = () => {
		if (popup.show && popup.id) {
			fetch(`http://what-state-rv.uk.r.appspot.com/scores/${popup.id}`, {
				method: 'PATCH',
			})
				.then(() => {
					setLoading(true)
					setPopup({
						show: false,
						id: null,
					})
				})
				.catch(console.error)
		}
	}

	return (
		<>
			{hsPopup ? (
				<div className='box'>
					<Draggable handle='.handle'>
						<section className='score-card container'>
							<div>
								<div className='handle'>
									<button
										onClick={() => {
											setHsPopup(false)
											answerInput.current.focus()
										}}
									>
										X
									</button>
								</div>
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
													<button onClick={() => handleDelete(userScore.id)}>
														Delete
													</button>
												</div>
											)
										})
								) : (
									<div>
										<p>You haven't saved anything.</p>
									</div>
								)}
							</div>
						</section>
					</Draggable>
					{popup.show ? (
						<DeletePopup
							handleDeleteTrue={handleDeleteTrue}
							handleDeleteFalse={handleDeleteFalse}
						/>
					) : null}
				</div>
			) : (
				<></>
			)}
		</>
	)
}
