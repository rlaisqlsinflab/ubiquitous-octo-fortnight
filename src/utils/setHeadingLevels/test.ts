// import type { HeadingLevels as Level } from '@inflearn/editor';

// import { setHeadingLevels } from './setHeadingLevels';

// describe('setHeadingLevels', () => {
//   const levels: Level[] = [1, 2, 3, 4, 5, 6];

//   describe('변경할 level과 변경될 level을 입력받아 원하는 heading level로 변경할 수 있다.', () => {
//     describe.each(levels)(`모든 heading level을 특정 level로 변경할 수 있다.`, (changeLevel) => {
//       const changeLevels = [
//         {
//           from: levels,
//           to: changeLevel,
//         },
//       ];

//       it.each([
//         {
//           html: '<h1>테스트</h1>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//         {
//           html: '<h2>테스트</h2>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//         {
//           html: '<h3>테스트</h3>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//         {
//           html: '<h4>테스트</h4>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//         {
//           html: '<h5>테스트</h5>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//         {
//           html: '<h6>테스트</h6>',
//           changeLevels,
//           expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//         },
//       ])(`$html -> $expected`, ({ html, changeLevels: _changeLevels, expected }) => {
//         expect(setHeadingLevels(html, _changeLevels)).toBe(expected);
//       });
//     });

//     describe('각 level을 원하는 level로 변경할 수 있다.', () => {
//       it.each([
//         {
//           html: '<h1></h1><h6></h6>',
//           changeLevels: [
//             { from: [1, 2, 3] as Level[], to: 3 as const },
//             { from: [4, 5, 6] as Level[], to: 4 as const },
//           ],
//           expected: '<h3></h3><h4></h4>',
//         },
//         {
//           html: '<h1></h1><h2></h2><h3></h3>',
//           changeLevels: [
//             { from: [1] as Level[], to: 4 as const },
//             { from: [2] as Level[], to: 5 as const },
//             { from: [3] as Level[], to: 6 as const },
//           ],
//           expected: '<h4></h4><h5></h5><h6></h6>',
//         },
//       ])(`$html -> $expected`, ({ html, changeLevels: _changeLevels, expected }) => {
//         expect(setHeadingLevels(html, _changeLevels)).toBe(expected);
//       });
//     });
//   });

//   describe('attribute는 변경된 태그에 그대로 적용된다.', () => {
//     const targetLevel = 6 as const;
//     const changeLevel = 4 as const;
//     const changeLevels = [
//       {
//         from: [targetLevel],
//         to: changeLevel,
//       },
//     ];

//     it.each([
//       {
//         html: `<h${targetLevel}>테스트</h${targetLevel}>`,
//         changeLevels,
//         expected: `<h${changeLevel}>테스트</h${changeLevel}>`,
//       },
//     ])('$html -> $expected', ({ html, changeLevels: _changeLevels, expected }) => {
//       expect(setHeadingLevels(html, _changeLevels)).toBe(expected);
//     });
//   });

//   context('중첩 구조의 태그가 넘어온 경우', () => {
//     const changeLevels = [
//       {
//         from: levels,
//         to: 4 as const,
//       },
//     ];

//     describe('태그 구성이 표준에 맞는 경우 h태그만 입력된 level로 변환한다.', () => {
//       it.each([
//         {
//           html: '<h1>테스트 <span>입니다.</span></h1>',
//           changeLevels,
//           expected: '<h4>테스트 <span>입니다.</span></h4>',
//         },
//         {
//           html: '<div><h1>테스트</h1></div>',
//           changeLevels,
//           expected: '<div><h4>테스트</h4></div>',
//         },
//       ])('$html -> $expected', ({ html, changeLevels: _changeLevels, expected }) => {
//         expect(setHeadingLevels(html, _changeLevels)).toBe(expected);
//       });
//     });

//     describe('태그 구성이 표준에 맞지 않으면 표준에 맞게 태그 구조가 변경된다.', () => {
//       it.each([
//         {
//           html: '<h1>테스트 <h2>입니다.</h2></h1>', // 해딩 태그는 중첩이 불가능함
//           changeLevels,
//           expected: '<h4>테스트 </h4><h4>입니다.</h4>',
//         },
//         {
//           html: '<h3><span>테스트</h3>', // 짝이 맞지 않음
//           changeLevels,
//           expected: '<h4><span>테스트</span></h4>',
//         },
//         { html: '<h1><h2>테스트</h1>', changeLevels, expected: '<h4></h4><h4>테스트</h4>' }, // 짝이 맞지 않고 h태그 중첩
//       ])('$html -> $expected', ({ html, changeLevels: _changeLevels, expected }) => {
//         expect(setHeadingLevels(html, _changeLevels)).toBe(expected);
//       });
//     });
//   });
// });

export {};
