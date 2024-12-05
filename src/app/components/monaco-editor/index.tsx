'use client';
import Editor, { Monaco, useMonaco } from '@monaco-editor/react';
import { useRef } from 'react';
import * as monaco from 'monaco-editor';
import { sqlKeywords } from '@/app/shared/data/keyword';

const SQL = `SELECT
  ELEMENT_AT(arr_int, 1) AS col1,
  ARRAY_COMPACT(arr_int) AS col2,
  ARRAY_FILTER(x -> x LIKE '%World%', arr_str) AS col3,
  TO_DATE(\`value\`) AS col4,
  YEAR(start_time) AS col5,
  MONTHS_ADD(start_time, 1) AS col6,
  REGEXP_EXTRACT_ALL(\`value\`, '(-.)') AS co7,
  JSON_EXTRACT('{"id": "33"}', '$.id') AS col8
FROM test_sqlconvert AS test_sqlconvert
WHERE
  DATE_TRUNC(start_time, 'day') = '2024-05-20 00:00:00'
ORDER BY
  id`;

export default function MonacoEditor() {
    // const monaco = useMonaco();

    const monacoRef = useRef<Monaco>();

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
        monacoRef.current = monaco;
        const model = editor.getModel();
        monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: function () {
                let suggestions: any = sqlKeywords.map(keyword => {
                    return {
                        label: keyword,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: keyword,
                    };
                });
                return {
                    suggestions: suggestions,
                };
            },
        });
    }

    return <Editor height="90vh" defaultLanguage="sql" defaultValue={SQL} onMount={handleEditorDidMount} />;
}
