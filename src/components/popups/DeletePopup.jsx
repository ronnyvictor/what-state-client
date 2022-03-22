import Draggable from 'react-draggable'

export default function DeletePopup({ handleDeleteTrue, handleDeleteFalse }) {
	return (
		<div className='box'>
			<Draggable handle='.handle'>
				<div style={{ width: '20%' }} className='score-card'>
					<div className='handle'>
						<button onClick={handleDeleteFalse}>X</button>
					</div>
					<div className='second-popup'>
						<p>Are you sure you want to delete?</p>
						<div className='buttons'>
							<button onClick={handleDeleteTrue}>Yes</button>
							<button onClick={handleDeleteFalse}>No</button>
						</div>
					</div>
				</div>
			</Draggable>
		</div>
	)
}
