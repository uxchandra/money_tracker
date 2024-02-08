const formTransaksi = document.querySelector("#form-transaksi");
const inputJenis = document.querySelector("#jenis");
const inputKeterangan = document.querySelector("#keterangan");
const inputJumlah = document.querySelector("#jumlah");
const inputTanggal = document.querySelector("#tanggal");
const bodiTabel = document.querySelector("#tabel-transaksi tbody");
const elemenSaldo = document.querySelector("#saldo");
const elementotalPemasukan = document.querySelector("#total-pemasukan");
const elementotalPengeluaran = document.querySelector("#total-pengeluaran");
const inputCari = document.querySelector("#cari");

let daftarTransaksi = [];
const opsiTanggal = { year: "numeric", month: "long", day: "numeric" };

function ubahTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
}

function updateTabel(daftarTransaksi) {
  bodiTabel.innerHTML = "";
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const baris = document.createElement("tr");
    baris.innerHTML = `
    <td>${transaksi.jenis === "pemasukan" ? "Pemasukan" : "Pengeluaran"}</td>
    <td>${transaksi.keterangan}</td>
    <td>Rp ${parseFloat(transaksi.jumlah).toLocaleString()}</td>
    <td>${ubahTanggal(transaksi.tanggal)}</td>
    <td><button onclick="hapusTransaksi(${transaksi.id})">Hapus</button></td>
`;
    bodiTabel.appendChild(baris);
  }
}

function updateSaldo() {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const jumlah = parseFloat(transaksi.jumlah);
    if (transaksi.jenis === "pemasukan") {
      totalPemasukan += jumlah;
    } else {
      totalPengeluaran += jumlah;
    }
  }
  const saldo = totalPemasukan - totalPengeluaran;
  elemenSaldo.innerHTML = `Rp ${saldo.toLocaleString()}`;
  elementotalPemasukan.innerHTML = `Rp ${totalPemasukan.toLocaleString()}`;
  elementotalPengeluaran.innerHTML = `Rp ${totalPengeluaran.toLocaleString()}`;
}
