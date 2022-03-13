export default function DeletePopup({ handleDeleteTrue, handleDeleteFalse }) {
	return (
		<div className='box'>
			<div className='score-card'>
				<div className='handle'>
					<button onClick={handleDeleteFalse}>X</button>
				</div>
				<div>
					<p>Are you sure you want to delete?</p>
				</div>
				<div>
					<button onClick={handleDeleteTrue}>Yes</button>
					<button onClick={handleDeleteFalse}>No</button>
				</div>
			</div>
		</div>
	)
}
