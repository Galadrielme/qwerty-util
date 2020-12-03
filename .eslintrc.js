/**
 * @author kaihua.wang
 * @since 2020-12-03 21:32:02
 * @modify 2020-12-03 21:35:43
 * @description
 */

module.exports = {
    parser:  '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    env:{
        browser: true,
        node: true,
    }
}
