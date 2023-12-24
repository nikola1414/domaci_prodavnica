let total = 0;
const renderItem = (item) => {
    const mbi = `minus-${item.cena}-${item.naziv}`;
    const pbi = `plus-${item.cena}-${item.naziv}`;
    const $mb = $(`<button id="${mbi}"><i class="fa-solid fa-minus"></i></button>`);
    const $pb = $(`<button id="${pbi}"><i class="fa-solid fa-plus"></i></button>`);
    const $row = $(`<tr>
                        <td>${item.naziv}</td>
                        <td>${item.cena}</td>
                        <td>
                            ${$mb[0].outerHTML}
                            <span class="ic" span-id="${mbi+pbi}">${item.komada}</span>
                            ${$pb[0].outerHTML}
                        </td>
                        <td class="it" td-id="${mbi+pbi+mbi}">${item.cena*item.komada}</td>
                    </tr>`);
    $row.find(`#${mbi}`).click(() => {
        if (item.komada > 0) {
            item.komada--;
            $(`.ic[span-id="${mbi+pbi}"]`).text(`${item.komada}`);
            $(`.it[td-id="${mbi+pbi+mbi}"]`).text(`${item.komada*item.cena}`);
            total -= Number(item.cena);
            $("#suma").text(total);
        }
    });
    $row.find(`#${pbi}`).click(() => {
        item.komada++;
        $(`.ic[span-id="${mbi+pbi}"]`).text(`${item.komada}`);
        $(`.it[td-id="${mbi+pbi+mbi}"]`).text(`${item.komada*item.cena}`);

        total += (Number(item.cena));
        $("#suma").text(total);
    });

    return $row;
};
const renderItemsList = (list) => {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        $("#item-list").append(renderItem(item));
        total += (item["cena"] * item["komada"]);
    }
    $("#item-list").append(`<tr>
                    <th><input type="text" id="input1"></th>
                    <th><input type="text" id="input2"></th>
                    <th><input type="text" id="input3"></th>
                    <th><p id="suma"></p></th>
                    <th><button id="dbi" type="button" onclick="addItem(this)">Dodaj</button></th>
                </tr>`)
    $("#suma").text(total);

};

let data;
$(document).ready(async () => {
    renderItemsList(items);
});

