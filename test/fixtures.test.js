const path = require('path')
const fs = require('fs-extra')
const pdfDiff = require('pdf-diff')

const PDFMerger = require('../index')

const FIXTURES_DIR = path.join(__dirname, 'fixtures')
const TMP_DIR = path.join(__dirname, 'tmp')

jest.setTimeout(10000)

describe('PDFMerger', () => {
	beforeAll(async () => {
		await fs.ensureDir(TMP_DIR)
	})

	test('merge two simple files', async () => {
		var merger = new PDFMerger()
		merger.add(path.join(FIXTURES_DIR, 'Testfile_A.pdf'))
		merger.add(path.join(FIXTURES_DIR, 'Testfile_B.pdf'))
		await merger.save(path.join(TMP_DIR, 'Testfile_AB.pdf'))

		diff = await pdfDiff(
			path.join(FIXTURES_DIR, 'Testfile_AB.pdf'),
			path.join(TMP_DIR, 'Testfile_AB.pdf')
		)

		expect(diff).toBeFalsy()
	})

	test('combine pages from multibe books (array)', async () => {
		var merger = new PDFMerger()
		const tmpFile = 'MergeDemo1.pdf'
		merger.add(path.join(FIXTURES_DIR, 'Testfile_AB.pdf'), [1])
		merger.add(path.join(FIXTURES_DIR, 'UDHR.pdf'), [1, 2, 3])
		await merger.save(path.join(TMP_DIR, tmpFile))

		diff = await pdfDiff(
			path.join(FIXTURES_DIR, 'MergeDemo.pdf'),
			path.join(TMP_DIR, tmpFile)
		)

		expect(diff).toBeFalsy()
	})

	test('combine pages from multibe books (start-end)', async () => {
		var merger = new PDFMerger()
		const tmpFile = 'MergeDemo2.pdf'
		merger.add(path.join(FIXTURES_DIR, 'Testfile_AB.pdf'), [1])
		merger.add(path.join(FIXTURES_DIR, 'UDHR.pdf'), '1-3')
		await merger.save(path.join(TMP_DIR, tmpFile))

		diff = await pdfDiff(
			path.join(FIXTURES_DIR, 'MergeDemo.pdf'),
			path.join(TMP_DIR, tmpFile)
		)

		expect(diff).toBeFalsy()
	})

	test('combine pages from multibe books (start - end)', async () => {
		var merger = new PDFMerger()
		const tmpFile = 'MergeDemo2.pdf'
		merger.add(path.join(FIXTURES_DIR, 'Testfile_AB.pdf'), [1])
		merger.add(path.join(FIXTURES_DIR, 'UDHR.pdf'), '1 - 3')
		await merger.save(path.join(TMP_DIR, tmpFile))

		diff = await pdfDiff(
			path.join(FIXTURES_DIR, 'MergeDemo.pdf'),
			path.join(TMP_DIR, tmpFile)
		)

		expect(diff).toBeFalsy()
	})

	test('combine pages from multibe books (start to end)', async () => {
		var merger = new PDFMerger()
		const tmpFile = 'MergeDemo2.pdf'
		merger.add(path.join(FIXTURES_DIR, 'Testfile_AB.pdf'), [1])
		merger.add(path.join(FIXTURES_DIR, 'UDHR.pdf'), '1 to 3')
		await merger.save(path.join(TMP_DIR, tmpFile))

		diff = await pdfDiff(
			path.join(FIXTURES_DIR, 'MergeDemo.pdf'),
			path.join(TMP_DIR, tmpFile)
		)

		expect(diff).toBeFalsy()
	})

	afterAll(async () => {
		await fs.remove(TMP_DIR)
	})
})