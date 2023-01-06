import {IMarker} from "react-ace/src/types";
import {getCharPositionInText} from "../../helpers/string";
import {RegexFlags, RegexTestResult} from "./RegexTester.types";

export class RegexTesterService {
  constructor(private testCases: string, private query: string, private flags: RegexFlags) {
  }

  public getResults(): RegexTestResult {
    if (this.query === "") {
      return {markers: [], matches: [], isValid: true}
    }

    const regex = this.createRegex()
    if (!regex) {
      return {markers: [], matches: [], isValid: false}
    }

    const matches = [...this.testCases.matchAll(regex)]
    const markers = this.createMarkers(matches)

    return {markers: markers, matches: matches.map(match => match[0]), isValid: true}
  }

  private createRegex(): RegExp | undefined {
    try {
      const activeFlags = Object.keys(this.flags).filter((flag) => this.flags[flag as keyof RegexFlags]).join('')
      const regex = new RegExp(this.query, activeFlags)
      "".match(regex)
      return regex
    } catch {
      return undefined
    }
  }

  private createMarkers(matches: RegExpMatchArray[]) {
    return matches.map(match => {
      const startLocation = getCharPositionInText(this.testCases, match.index as number)
      const endLocation = getCharPositionInText(this.testCases, match.index as number + match[0].length)
      if (!startLocation || !endLocation) {
        return undefined
      }
      return {
        startRow: startLocation.row,
        endRow: endLocation.row,
        startCol: startLocation.col,
        endCol: endLocation.col,
        type: 'text',
        className: 'marker',
      }
    }).filter(i => i) as IMarker[]
  }
}
