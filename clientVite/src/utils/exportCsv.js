export const exportTableToCSV = (payload, fileName) => {
	let json = []

	if (payload.length) {
		payload.map((node) => {
			json.push(node)

			return null
		})

		downloadCSV(toCSV(json), fileName)
	}
}

function toCSV(json) {
	let csv = ''
	let keys = (json[0] && Object.keys(json[0])) || []
	let keys_array = []
	keys.map((key) => {
		keys_array.push(`"${key}"`)
		return null
	})
	csv += keys_array.join(',') + '\n'
	for (let line of json) {
		csv += keys.map((key) => `"${line[key]}"`).join(',') + '\n'
	}
	return csv
}

function downloadCSV(csv, filename) {
	let csvFile
	let downloadLink

	csvFile = new Blob([csv], { type: 'text/csv' })
	downloadLink = document.createElement('a')
	downloadLink.download = filename
	downloadLink.href = window.URL.createObjectURL(csvFile)
	downloadLink.style.display = 'none'
	document.body.appendChild(downloadLink)
	downloadLink.click()
}
