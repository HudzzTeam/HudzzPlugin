Hello,

Thanks for uploading your plugin, we can begin with the review. We are a group of volunteers who help you identify common issues so that you can make your plugin more secure, compatible, reliable and compliant with the guidelines.

There are issues with your plugin code preventing it from being approved immediately. We have pended your submission in order to help you correct all issues so that it may be approved and published.

We ask you read this email in its entirety, address all listed issues, and reply to this email after uploading a corrected version of your code. Failure to do so will result in your review being delayed or even rejected.

We know this email can be long, but we kindly ask you to be meticulous in fixing the issues we mention so that we can make the best use of our volunteer time and get your plugin approved as soon as possible.

Remember that in addition to code quality, security and functionality, we require all plugins to adhere to our guidelines. If you have not yet, please read them: https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/

Finally, should you at any time wish to alter your permalink (aka the plugin slug), you must explicitly tell us what you want it to be. Just changing the display name is not sufficient, and we require to you clearly state your desired permalink. Remember, permalinks cannot be altered after approval.

Be aware that you will not be able to submit another plugin while this one is being reviewed.


## Use wp_enqueue commands

Your plugin is not correctly including JS and/or CSS. You should be using the built in functions for this:

When including JavaScript code you can use:
wp_register_script() and wp_enqueue_script() to add JavaScript code from a file.
wp_add_inline_script() to add inline JavaScript code to previous declared scripts.

When including CSS you can use:
wp_register_style() and wp_enqueue_style() to add CSS from a file.
wp_add_inline_style() to add inline CSS to previously declared CSS.

Note that as of WordPress 5.7, you can pass attributes like async, nonce, and type by using new functions and filters: https://make.wordpress.org/core/2021/02/23/introducing-script-attributes-related-functions-in-wordpress-5-7/

If you're trying to enqueue on the admin pages you'll want to use the admin enqueues.

https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
https://developer.wordpress.org/reference/hooks/admin_print_scripts/
https://developer.wordpress.org/reference/hooks/admin_print_styles/

Example(s) from your plug
<!-- hudzz-closing-disclosure-generator/hudzz-closing-disclosure-generator.php:157 <style type="text/css"> -->



## Internationalization: Don't use variables or defines as text, context or text domain parameters.

In order to make a string translatable in your plugin you are using a set of special functions. These functions collectively are known as "gettext".

There is a dedicated team in the WordPress community to translate and help other translating strings of WordPress core, plugins and themes to other languages.

To make them be able to translate this plugin, please do not use variables or function calls for the text, context or text domain parameters of any gettext function, all of them NEED to be strings. Note that the translation parser reads the code without executing it, so it won't be able to read anything that is not a string within these functions.

For example, if your gettext function looks like this...
esc_html__( $greetings , 'plugin-slug' );
...the translator won't be able to see anything to be translated as $greetings is not a string, it is not something that can be translated.
You need to give them the string to be translated, so they can see it in the translation system and can translate it, the correct would be as follows...
esc_html__( 'Hello, how are you?' , 'plugin-slug' );

This also applies to the translation domain, this is a bad call:
esc_html__( 'Hello, how are you?' , $plugin_slug );
The fix here would be like this
esc_html__( 'Hello, how are you?' , 'plugin-slug' );
Also note that the translation domain needs to be the same as your plugin slug.

What if we want to include a dynamic value inside the translation? Easy, you need to add a placeholder which will be part of the string and change it after the gettext function does its magic, you can use printf to do so, like this:
printf(
       /* translators: %s: First name of the user */
       esc_html__( 'Hello %s, how are you?', 'plugin-slug' ),
       esc_html( $user_firstname )
 );

You can read https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/#text-domains for more information.

Example(s) from your plugin:

hudzz-closing-disclosure-generator/hudzz-closing-disclosure-generator.php:76 __('Enter the height of the root view in a valid CSS value. Recommended minimum height of 700px.');


## Internationalization: Text domain does not match plugin slug.

In order to make a string translatable in your plugin you are using a set of special functions. These functions collectively are known as "gettext".

These functions have a parameter called "text domain", which is a unique identifier for retrieving translated strings.

This "text domain" must be the same as your plugin slug so that the plugin can be translated by the community using the tools provided by the directory. As for example, if this plugin slug is penfold-macrame the Internationalization functions should look like:
esc_html__('Hello', 'penfold-macrame');

From your plugin, you have set your text domain as follows:

# This plugin is using the domain "hudzz" for 13 element(s).

However, the current plugin slug is this:

hudzz-closing-disclosure-generator


## Generic function/class/define/namespace/option names

All plugins must have unique function names, namespaces, defines, class and option names. This prevents your plugin from conflicting with other plugins or themes. We need you to update your plugin to use more unique and distinct names.

A good way to do this is with a prefix. For example, if your plugin is called "Easy Custom Post Types" then you could use names like these:
function ecpt_save_post()
class ECPT_Admin{}
namespace ECPT;
update_option( 'ecpt_settings', $settings );
define( 'ECPT_LICENSE', true );
global $ecpt_options;

Don't try to use two (2) or three (3) letter prefixes anymore. We host nearly 100-thousand plugins on WordPress.org alone. There are tens of thousands more outside our servers. Believe us, you’re going to run into conflicts.

You also need to avoid the use of __ (double underscores), wp_ , or _ (single underscore) as a prefix. Those are reserved for WordPress itself. You can use them inside your classes, but not as stand-alone function.

Please remember, if you're using _n() or __() for translation, that's fine. We're only talking about functions you've created for your plugin, not the core functions from WordPress. In fact, those core features are why you need to not use those prefixes in your own plugin! You don't want to break WordPress for your users.

Related to this, using if (!function_exists('NAME')) { around all your functions and classes sounds like a great idea until you realize the fatal flaw. If something else has a function with the same name and their code loads first, your plugin will break. Using if-exists should be reserved for shared libraries only.

Remember: Good prefix names are unique and distinct to your plugin. This will help you and the next person in debugging, as well as prevent conflicts.

Analysis result:

# This plugin is using the prefix "hudzz" for 6 element(s).

# Cannot use "add" as a prefix.
hudzz-closing-disclosure-generator/hudzz-closing-disclosure-generator.php:49 function add_type_attribute


----------------------------------------------

Please note that due to the significant effort this reviews require, we are doing basic reviews the first time we review your plugin. Once the issues we shared above are fixed, we will do a more in-depth review that might surface other issues.

We recommend that you get ahead of us by checking for some common issues that require a more thorough review such as the use of nonces or determining plugin and content directories correctly.

Your next steps are:

Make all the corrections related to the issues we listed.
Review your entire code following best practices and the guidelines to ensure there are no other related issues.
Go to "Add your plugin" and upload an updated version of this plugin. You can update the code there whenever you need to along the review process, we will check the latest version.
Reply to this email telling us that you have updated it and letting us know if there is anything we need to know or have in mind. It is not necessary to list the changes, as we will check the whole plugin again.

To make this process as quick as possible and to avoid burden on the volunteers devoting their time to review this plugin's code, we ask you to thoroughly check all shared issues and fix them before sending the code back to us.

We encourage all plugin authors to use tools like Plugin Check to ensure that most basic issues are fixed first. If you haven't used it yet, give it a try, it will save us both time and speed up the review process.
Please note: Automated tools can give false positives, or may miss issues. Plugin Check and other tools cannot guarantee that our reviewers won't find an issue that needs fixing or clarification.

We again remind you that should you wish to alter your permalink (not the display name, the plugin slug), you must explicitly tell us what you want it to be. We require to you clearly state in the body of your email what your desired permalink is. Permalinks cannot be altered after approval, and we generally do not accept requests to rename should you fail to inform us during the review. If you previously asked for a permalink change and got a reply that is has been processed, you’re all good! While these emails will still use the original display name, you don’t need to panic. If you did not get a reply that we processed the permalink, let us know immediately.

While we have tried to make this review as exhaustive as possible we, like you, are humans and may have missed things. As such, we will re-review the entire plugin when you send it back to us. We appreciate your patience and understanding.

If the corrections we requested in this initial review are not completed within 3 months (90 days), we will reject this submission in order to keep our queue manageable.

If you have questions, concerns, or need clarification, please reply to this email and just ask us.


--
WordPress Plugin Review Team | plugins@wordpress.org
https://make.wordpress.org/plugins/
https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/
{#HS:2601860063-498372#}  
On Thu, Jun 27, 2024 at 4:35 PM UTC, Hudzz Team <team@hudzz.com> wrote:
Hello,

I just want to check in on progress! This is the email confirming we own the domain Hudzz.com. I've updated the Wordpress account to reflect the email change.

I would greatly appreciate an acknowledgment of reception of this email so we can get back in line for plugin approval!

Thanks,
Hudzz Team

On Mon, Jun 24, 2024 at 6:52 PM UTC, Hudzz Team <team@hudzz.com> wrote:
Hello,

I'm replying to the email below to confirm the ownership of the domain hudzz.com!

The wordpress account that WAS hudzzteam@gmail.com is now team@hudzz.com.

Hopefully this satisfies this requirement:

3. Make an official account on WordPress.org that has an email from the domain that owns the product and reply to this email, telling us what the account name is, so we can change the plugin owner for you.


Thanks,
Hudzz Team

On Sun, May 19, 2024 at 6:08 PM UTC, WordPress.org Plugin Directory <plugins@wordpress.org> wrote:
Your plugin review has been pended without looking at the code due to a possible issue with the ownership.

We know this email is long, but please read the ensure email carefully in order to minimize any future delays.

This plugin does not appear to have been submitted by someone legally represent the ownership indicated in the code, readme, and/or by the name of the plugin.

https://www.hudzz.com/

Please note: Even if your email address relates to the company in the username (as in 'yourcompany@gmail.com') we look at the domain. Anyone can make a random gmail account, after all, and you would rightfully be upset if we failed to confirm actual ownership in a demonstrably reliable way. This also means using the official domain as 'your' URL is insufficient. Anyone can set their email in a profile to anything they want.

What this means

Generally people get this message when their contact information cannot be confirmed as actually belonging to the plugin creator. This can happen for a number of reasons, including:

being a consultant/firm hired by the owners to create a plugin
using the wrong account to upload a plugin
not realizing that beginning a plugin with a trademark/company name is in fact a violation of guidelines if you don't work for them
not publicly documenting your ownership on the official website

Most of the time it's that first one, and due to a number of legal dramas, we do not accept consultant-submitted plugins for 3rd parties. We require the plugin to be clearly owned by the official company. If company X hired you to make a plugin, they have to own the plugin for your own legal protection.

What to do next

To resolve this you do one of the following:

Convert the email on your user account to an official one for the owners and reply to this email from that account so we can verify.
Make an official account on WordPress.org that has an email from the domain that owns the product and reply to this email, telling us what the account name is, so we can change the plugin owner for you.
Provide proof that confirms you legally have the right to the code (normally this happens if you own multiple domains and did not publicly document on them that they are owned by the same entity) -- Note that this will not be accepted if your email remains from a free-email service (i.e. gmail, hotmail, etc).
Correct your plugin code (changing the name) to make it clear this is not an official plugin and go to "Add your plugin" and upload an updated version of this plugin. You will also need to tell us exactly what permalink you want. We do not assume that the zip name is the permalink.

You can reply to this email with either the information, or the updated plugin, and we will proceed with your review.

Please do not resubmit this plugin as another account.

Doing so will result in both submissions being rejected and your accounts suspended until we can sort things out. We promise, it's much easier if you just reply to this email and explain your situation. Tell us what you would like us to change :)

https://developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/#what-if-i-submitted-the-plugin-with-the-wrong-user-id

We can fix pretty much everything.

Why this matters

We do not accept plugins using the trademarked name of a company unless the ID used to create the plugin can be verified as legally belonging to said company. Just having the right readme or inline documentation is not safe enough anymore as anyone can fake those.

This is an issue of legality and copyright. We don't enjoy being pressed later on complaining that someone else is using a plugin name that legally they do not represent.

Furthermore, we do not accept 'permission' at this time, because if it's rescinded, we would be forced to close your plugin. Since there's no way to redirect people to the new plugin, we prefer to not break your ability to support your users.

Please understand we're doing this to protect you as well as the company. Even if they tell you it's okay, or if you were actually hired by the company, we won't allow it because without a way to ensure they own their own code, we open up you for legal issues down the road. Contracts end, agreements fail, and people change their minds. If this is an official plugin, it should be owned by the official company, not a consultant or contractor.

Once this is resolved, we can review your plugin.


--
WordPress Plugin Review Team | plugins@wordpress.org
https://make.wordpress.org/plugins/
https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/