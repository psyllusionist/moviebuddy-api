const handleList = (req, res, db) => {
	const { email } = req.body;
	db('movies')
	.returning('*')
	.where({email: email})
	.then(data => {
		res.json(data)
	})
}

const updateList = (req, res, db) => {
	const { email, Title, Year, imdbID, Poster } = req.body;
	db('movies')
	.returning('*')
	.insert({
	Title: Title,
	Year: Year,
	imdbID: imdbID,
	Poster: Poster,
	email: email
	})
	.then(data => {
		res.json(data[0])
	})
	.catch(err => res.status(400).json('unable to update'))
}

const deleteList = (req, res, db) => {
	const { imdbID, email } = req.body;
	db('movies')
	.returning('*')
	.where({imdbID: imdbID, email: email})
  	.del()
  	.then(data => {res.json(data)})
	.catch(err => res.status(400).json('unable to update'))
}


module.exports = {
	handleList: handleList,
	updateList: updateList,
	deleteList: deleteList
}