import { RegexTesterService } from '../../../src/features/regex-tester/RegexTester.service'
import { RegexFlags, RegexTestResult } from '../../../src/features/regex-tester/RegexTester.types'

describe('RegexTesterService', () => {
  let service: RegexTesterService
  let testCases: string
  let query: string
  let flags: RegexFlags

  beforeEach(() => {
    testCases = 'abc\n123'
    query = ''
    flags = { g: true, m: true, i: false }
    service = new RegexTesterService(testCases, query, flags)
  })

  describe('getResults', () => {
    it('should return valid results with empty query', () => {
      const result: RegexTestResult = service.getResults()
      expect(result.isValid).toBe(true)
      expect(result.matches).toEqual([])
      expect(result.markers).toEqual([])
    })

    it('should return valid results with valid regex', () => {
      query = '^[a-z]'
      service = new RegexTesterService(testCases, query, flags)
      const result: RegexTestResult = service.getResults()
      expect(result.isValid).toBe(true)
      expect(result.matches).toEqual(['a'])
      expect(result.markers).toEqual([
        {
          startRow: 0,
          endRow: 0,
          startCol: 0,
          endCol: 1,
          type: 'text',
          className: 'marker',
        },
      ])
    })

    it('should return invalid results with invalid regex', () => {
      query = '['
      service = new RegexTesterService(testCases, query, flags)
      const result: RegexTestResult = service.getResults()
      expect(result.isValid).toBe(false)
      expect(result.matches).toEqual([])
      expect(result.markers).toEqual([])
    })

    it('should return valid results with g and m flags', () => {
      query = '[a-z]'
      flags = { g: true, m: true, i: false }
      service = new RegexTesterService(testCases, query, flags)
      const result: RegexTestResult = service.getResults()
      expect(result.isValid).toBe(true)
      expect(result.matches).toEqual(['a', 'b', 'c'])
      expect(result.markers).toEqual([
        {
          startRow: 0,
          endRow: 0,
          startCol: 0,
          endCol: 1,
          type: 'text',
          className: 'marker',
        },
        {
          startRow: 0,
          endRow: 0,
          startCol: 1,
          endCol: 2,
          type: 'text',
          className: 'marker',
        },
        {
          startRow: 0,
          endRow: 0,
          startCol: 2,
          endCol: 3,
          type: 'text',
          className: 'marker',
        },
      ])
    })

    it('should return valid results with g, m, and i flags', () => {
      query = '[A-Z]'
      flags = { g: true, m: true, i: true }
      service = new RegexTesterService(testCases, query, flags)
      const result: RegexTestResult = service.getResults()
      expect(result.isValid).toBe(true)
      expect(result.matches).toEqual(['a', 'b', 'c'])
      expect(result.markers).toEqual([
        {
          startRow: 0,
          endRow: 0,
          startCol: 0,
          endCol: 1,
          type: 'text',
          className: 'marker',
        },
        {
          startRow: 0,
          endRow: 0,
          startCol: 1,
          endCol: 2,
          type: 'text',
          className: 'marker',
        },
        {
          startRow: 0,
          endRow: 0,
          startCol: 2,
          endCol: 3,
          type: 'text',
          className: 'marker',
        },
      ])
    })
  })
})
