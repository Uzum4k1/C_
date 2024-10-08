import { expect } from "chai";
import { tambah, kali, kurang, bagi } from "./math.js";

describe("Pengujian Fungsi Matematika", function () {
  // Positive cases
  it("seharusnya mengembalikan 12 saat menambahkan 2 + 10", function () {
    expect(tambah(2, 10)).to.equal(12);
  });

  it('seharusnya mengembalikan 4 saat menambahkan 2 + 2', function() {
    expect(tambah(2, 2)).to.equal(4);
  });

  it('seharusnya mengembalikan 6 saat mengalikan 2 * 3', function() {
    expect(kali(2, 3)).to.equal(6);
  });

  it('seharusnya mengembalikan 0 saat mengurangkan 2 - 2', function() {
    expect(kurang(2, 2)).to.equal(0);
  });

  it('seharusnya mengembalikan -15 saat mengurangkan -10 - 5', function() {
    expect(kurang(-10, 5)).to.equal(-15);
  });

  it('seharusnya mengembalikan 2 saat membagi 6 / 3', function() {
    expect(bagi(6, 3)).to.equal(2);
  });

  it('seharusnya mengembalikan error saat membagi dengan 0', function() {
    expect(() => bagi(6, 0)).to.throw('Tidak bisa membagi dengan nol');
  });

  it('seharusnya mengembalikan 1 saat membagi 3 / 3', function() {
    expect(bagi(3, 3)).to.equal(1);
  });

  it('seharusnya mengembalikan 2 saat membagi -6 / -3', function() {
    expect(bagi(-6, -3)).to.equal(2);
  });

  it('seharusnya mengembalikan error saat mengalikan 2 * \'3\'', function() {
    expect(() => kali(2, '3')).to.throw('Input harus berupa angka');
  });

  // Negative cases for function tambah
  it('seharusnya mengembalikan error jika input pertama untuk tambah adalah string', function() {
    expect(() => tambah('2', 10)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input kedua untuk tambah adalah string', function() {
    expect(() => tambah(2, '10')).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input pertama untuk tambah adalah null', function() {
    expect(() => tambah(null, 10)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input kedua untuk tambah adalah null', function() {
    expect(() => tambah(2, null)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika salah satu input untuk tambah adalah undefined', function() {
    expect(() => tambah(undefined, 10)).to.throw('Input harus berupa angka');
  });

  // Negative cases for function kali
  it('seharusnya mengembalikan error jika input pertama untuk kali adalah string', function() {
    expect(() => kali('2', 10)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input kedua untuk kali adalah string', function() {
    expect(() => kali(2, '10')).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input pertama untuk kali adalah null', function() {
    expect(() => kali(null, 10)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika input kedua untuk kali adalah null', function() {
    expect(() => kali(2, null)).to.throw('Input harus berupa angka');
  });

  it('seharusnya mengembalikan error jika salah satu input untuk kali adalah undefined', function() {
    expect(() => kali(undefined, 10)).to.throw('Input harus berupa angka');
  });
});
