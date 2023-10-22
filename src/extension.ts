import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let commands: vscode.Disposable[] = [];
  commands.push(
    vscode.commands.registerCommand("voicevox-tools.addTextToSelection", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selections = editor.selections;

        // コールバック内で非同期処理を適切に処理します
        vscode.window
          .showInputBox({ prompt: "追加するテキストを入力してください" })
          .then((inputText) => {
            if (inputText) {
              // 選択された行に対して処理を行います
              editor.edit((editBuilder) => {
                selections.forEach((selection) => {
                  for (
                    let i = selection.start.line;
                    i <= selection.end.line;
                    i++
                  ) {
                    const line = editor.document.lineAt(i);
                    const text = line.text;

                    // 入力されたテキストを選択された行の先頭に追加します
                    const newText = inputText + text;
                    editBuilder.replace(line.range, newText);
                  }
                });
              });
            }
          });
      }
    })
  );

  commands.push(
    vscode.commands.registerCommand(
      "voicevox-tools.addTextToSelectionWithLine",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const selections = editor.selections;

          let selectedCharacter = "";
          let characters: string[] = [
            "四国めたん[Sikoku-Metann]",
            "ずんだもん[Zunndamonn]",
            "春日部つむぎ[Kasukabe-Tumugi]",
            "雨晴はう[Amehare-Hauta]",
            "波音リツ[Namine-Ritu]",
            "玄野武宏[Kurono-Takehiro]",
            "白上虎太郎[Sirakami-Kotarou]",
            "青山龍星[Aoyama-Ryuusei]",
            "冥鳴ひまり[Meimei-Himari]",
            "九州そら[Kyuusyuu-Sora]",
            "もち子さん[Motiko-san]",
            "剣崎雌雄[Kenzaki-Mesuo]",
            "WhiteCUL[Howaito-Karu]",
            "後鬼[Goki]",
            "No.7[number.7]",
            "ちび式じい[Tibisiki-Zii]",
            "櫻歌ミコ[Ouka-Miko]",
            "小夜/SAYO[SAYO]",
            "ナースロボ＿タイプＴ[Na-surobo_tipuT]",
            "†聖騎士紅桜†[Ho-ri-naito-Benizakura]",
            "雀松朱司[Wakamatu-Akasi]",
            "春歌ナナ[Haruuta-Nana]",
            "猫使アル[Nekotuka-Aru]",
            "猫使ビィ[Nekotuka-Bixi]",
            "中国うさぎ[Tyuugoku-Usagi]",
            "満別花丸[Mannbetu-Hanamaru]",
            "琴詠ニア[Kotoyomi-Nia]",
          ];
          vscode.window
            .showQuickPick(characters, {
              placeHolder: "選択してください",
            })
            .then((selectedOption) => {
              if (selectedOption) {
                // 選択したキャラクター名から[*]の部分を削除します
                selectedCharacter = selectedOption.replace(/\[[^\[\]]*\]/g, "");
                selectedCharacter += ",";

                // 選択肢を受け取った後にエディタの変更を行う
                editor.edit((editBuilder) => {
                  selections.forEach((selection) => {
                    for (
                      let i = selection.start.line;
                      i <= selection.end.line;
                      i++
                    ) {
                      const line = editor.document.lineAt(i);
                      const text = line.text;

                      // 入力されたテキストを選択された行の先頭に追加します
                      const newText = selectedCharacter + text;
                      editBuilder.replace(line.range, newText);
                    }
                  });
                });
              }
            });
        }
      }
    )
  );
  commands.forEach((element) => {
    context.subscriptions.push(element);
  });
}
