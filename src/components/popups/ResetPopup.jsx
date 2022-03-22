import Draggable from 'react-draggable'

export default function ResetPopup({ handleReset, setPopup }) {
	return (
		<div className='box' style={{ zIndex: 999 }}>
			<Draggable handle='.handle'>
				<div style={{ width: '20%' }} className='score-card'>
					<div className='handle'>
						<button style={{ margin: 0 }} onClick={() => setPopup(false)}>
							X
						</button>
					</div>
					<div className='second-popup'>
						<p>Are you sure you want to reset?</p>
						<div className='buttons'>
							<button
								style={{ margin: 0 }}
								onClick={() => {
									handleReset()
									setPopup(false)
								}}
							>
								Yes
							</button>
							<button style={{ margin: 0 }} onClick={() => setPopup(false)}>
								No
							</button>
						</div>
					</div>
				</div>
			</Draggable>
		</div>
	)
}
