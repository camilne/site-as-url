import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];

  _encoded: String;
  _decoded: String;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: String) => {
      this._decoded = this.decode(fragment);
    })
  }

  set text(value: String) {
    this._encoded = this.encode(value);
  }

  get encoded(): String {
    return this._encoded;
  }

  get decoded(): String {
    return this._decoded;
  }

  private encode(value: String): String {
    let result = "";
    for (let i = 0; i < value.length; i += 3) {
      const mask1 = 0xFC;
      const mask21 = 0x03;
      const mask22 = 0xF0;
      const mask31 = 0x0F;
      const mask32 = 0xC0;
      const mask4 = 0x3F;

      result = result.concat(this.ALPHABET[(mask1 & value.charCodeAt(i)) >> 2]);

      if (i + 1 < value.length) {
        result = result.concat(this.ALPHABET[((mask21 & value.charCodeAt(i)) << 4) | ((mask22 & value.charCodeAt(i + 1)) >> 4)]);
      }
      else {
        result = result.concat(this.ALPHABET[(mask21 & value.charCodeAt(i)) << 4]);
      }

      if (i + 1 < value.length) {
        if (i + 2 < value.length) {
          result = result.concat(this.ALPHABET[((mask31 & value.charCodeAt(i + 1)) << 2) | ((mask32 & value.charCodeAt(i + 2)) >> 6)]);
        }
        else {
          result = result.concat(this.ALPHABET[(mask31 & value.charCodeAt(i + 1)) << 2]);
        }
      }
      else {
        result = result.concat("=")
      }

      if (i + 2 < value.length) {
        result = result.concat(this.ALPHABET[mask4 & value.charCodeAt(i + 2)]);
      }
      else {
        result = result.concat("=")
      }
    }
    return result;
  }

  private decode(value: String) : String {
    let result = "";
    for (let i = 0; i < value.length; i += 4) {
      const mask21 = 0x30;
      const mask22 = 0x0F;
      const mask31 = 0x3C;
      const mask32 = 0x03;

      const index = this.ALPHABET.lastIndexOf(value[i]);
      const index1 = this.ALPHABET.lastIndexOf(value[i + 1]);
      const index2 = this.ALPHABET.lastIndexOf(value[i + 2]);
      const index3 = this.ALPHABET.lastIndexOf(value[i + 3]);

      result = result.concat(String.fromCharCode((index << 2) | ((index1 & mask21) >> 4)));

      if (index2 == -1) {
        break;
      }

      result = result.concat(String.fromCharCode(((index1 & mask22) << 4) | ((index2 & mask31) >> 2)));

      if (index3 == -1) {
        break;
      }

      result = result.concat(String.fromCharCode(((index2 & mask32) << 6) | index3));
    }
    return result;
  }

}
