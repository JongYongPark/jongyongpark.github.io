WEBVTT

9f30d60e-e160-4571-80eb-7a69413b5cb2/13-0
00:00:06.037 --> 00:00:06.677
<v Elizabeth George>Hi everyone.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/16-0
00:00:07.987 --> 00:00:09.147
<v Ryan Park>Oh yeah. Hi.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/33-0
00:00:13.817 --> 00:00:19.153
<v Ryan Park>And yeah, the, you know,
last May we are asking some additional 2</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/33-1
00:00:19.153 --> 00:00:21.417
<v Ryan Park>test auditional work around.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/40-0
00:00:22.827 --> 00:00:25.387
<v Ryan Park>Also the our can e-mail.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/51-0
00:00:25.577 --> 00:00:33.377
<v Ryan Park>I'll send the e-mail about the leave the
comment from the identified so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/54-0
00:00:36.147 --> 00:00:36.947
<v Ken Prole>Yeah. Hi everyone.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/66-0
00:00:37.887 --> 00:00:41.847
<v Mahadevan Krishnan>Hey again, can I think we will.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/57-0
00:00:38.917 --> 00:00:39.157
<v Ken Prole>Hey.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/86-0
00:00:42.007 --> 00:00:47.042
<v Mahadevan Krishnan>We have two environments in non
production where we can demonstrate one</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/86-1
00:00:47.042 --> 00:00:51.727
<v Mahadevan Krishnan>has the timeout set to two minutes and
the other does not have it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/95-0
00:00:52.447 --> 00:00:56.127
<v Mahadevan Krishnan>Both of them have the same kind of
network rules etc.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/109-0
00:00:57.467 --> 00:01:02.427
<v Mahadevan Krishnan>We'll we'll explain how we have tested it
so far and the kind of behavior.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/117-0
00:01:04.547 --> 00:01:07.107
<v Mahadevan Krishnan>The workaround that was suggested by you
guys.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/125-0
00:01:07.657 --> 00:01:10.017
<v Mahadevan Krishnan>We'll also demonstrate how that happens.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/135-0
00:01:10.737 --> 00:01:18.057
<v Mahadevan Krishnan>Rahul from our side will be able to
demonstrate that followed by we will.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/163-0
00:01:20.147 --> 00:01:23.587
<v Mahadevan Krishnan>Surya from our side will be able to
modify the configs,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/163-1
00:01:23.587 --> 00:01:27.027
<v Mahadevan Krishnan>relaunch the Tomcat server et cetera,
et cetera, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/172-0
00:01:27.027 --> 00:01:32.547
<v Mahadevan Krishnan>So first we'll showcase what we have been
telling so far, which might.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/181-0
00:01:34.227 --> 00:01:36.707
<v Mahadevan Krishnan>Be giving you additional insights which
you may not be aware.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/191-0
00:01:37.377 --> 00:01:40.657
<v Mahadevan Krishnan>So far I know that you've been involved
in our case.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/209-0
00:01:42.507 --> 00:01:44.746
<v Mahadevan Krishnan>With water evidences we have been
providing,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/209-1
00:01:44.746 --> 00:01:48.627
<v Mahadevan Krishnan>but we just wanted to showcase this very
quickly and then take it from there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/212-0
00:01:49.847 --> 00:01:50.527
<v Ken Prole>Sure. Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/219-0
00:01:50.527 --> 00:01:52.327
<v Ken Prole>And just a note, so I sent an e-mail.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/259-0
00:01:52.327 --> 00:01:57.782
<v Ken Prole>It looks like you know in that one log
from a couple of days ago that it shows</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/230-0
00:01:56.497 --> 00:01:56.617
<v Mahadevan Krishnan>Hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/259-1
00:01:57.782 --> 00:02:01.235
<v Ken Prole>that it did actually succeed in cloning
the repo,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/259-2
00:02:01.235 --> 00:02:06.622
<v Ken Prole>which you know kind of gives evidence
that it it it wasn't able to go through</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/243-0
00:02:01.527 --> 00:02:01.807
<v Mahadevan Krishnan>Sure.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/259-3
00:02:06.622 --> 00:02:07.727
<v Ken Prole>the process, OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/258-0
00:02:08.297 --> 00:02:08.737
<v Mahadevan Krishnan>Yep.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/271-0
00:02:09.787 --> 00:02:11.307
<v Ken Prole>Yeah. So yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/283-0
00:02:09.817 --> 00:02:13.220
<v Mahadevan Krishnan>And and we'll, we'll, we'll,
we'll showcase that as well.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/283-1
00:02:13.220 --> 00:02:17.737
<v Mahadevan Krishnan>We did test again this morning and we'll
take you through all of that, yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/284-0
00:02:18.927 --> 00:02:19.207
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/298-0
00:02:20.067 --> 00:02:24.987
<v Mahadevan Krishnan>So this is our production instance of
GitHub we have.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/314-0
00:02:25.067 --> 00:02:30.647
<v Mahadevan Krishnan>This is a private repo of web goat.
We are going to try and integrate with</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/314-1
00:02:30.647 --> 00:02:31.987
<v Mahadevan Krishnan>this private repo.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/325-0
00:02:34.067 --> 00:02:37.827
<v Mahadevan Krishnan>If first in our develop,
which one are you trying to do RAH.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/335-0
00:02:40.257 --> 00:02:43.137
<v Rahul Pande>Happy to do however you want to lead it,
yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/334-0
00:02:41.987 --> 00:02:42.347
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/343-0
00:02:43.827 --> 00:02:46.027
<v Mahadevan Krishnan>Let let's do Dev first.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/352-0
00:02:46.027 --> 00:02:48.867
<v Mahadevan Krishnan>So the dev instance is on 3.0.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/345-0
00:02:46.437 --> 00:02:46.717
<v Rahul Pande>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/374-0
00:02:49.147 --> 00:02:56.171
<v Mahadevan Krishnan>It does not have the git config time.
The config around Git timeout configured</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/374-1
00:02:56.171 --> 00:03:02.307
<v Mahadevan Krishnan>at the moment it is whatever default
config it has, right? So let's.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/383-0
00:03:03.987 --> 00:03:06.187
<v Mahadevan Krishnan>Maybe open up the developer tools.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/379-0
00:03:04.657 --> 00:03:04.777
<v Ken Prole>Yep.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/385-0
00:03:06.187 --> 00:03:06.787
<v Mahadevan Krishnan>Also, Rahul.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/388-0
00:03:12.457 --> 00:03:12.897
<v Rahul Pande>Sure, Mary.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/391-0
00:03:12.897 --> 00:03:13.537
<v Rahul Pande>No problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/401-0
00:03:13.897 --> 00:03:16.617
<v Rahul Pande>I'll put networks here and if the.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/395-0
00:03:15.557 --> 00:03:15.917
<v Mahadevan Krishnan>All right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/403-0
00:03:15.957 --> 00:03:18.237
<v Mahadevan Krishnan>So I'll I'll leave it with you now, OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/409-0
00:03:20.017 --> 00:03:22.537
<v Mahadevan Krishnan>So this times out after 15 seconds.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/415-0
00:03:23.377 --> 00:03:24.057
<v Ken Prole>Oh, so this is.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/423-0
00:03:24.057 --> 00:03:27.937
<v Ken Prole>Does this have the the the updated build
that we provided or no?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/437-0
00:03:29.077 --> 00:03:31.999
<v Mahadevan Krishnan>This is on 3.0.
I think the updated build has this one</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/437-1
00:03:31.999 --> 00:03:32.477
<v Mahadevan Krishnan>right so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/450-0
00:03:34.027 --> 00:03:36.307
<v Mahadevan Krishnan>But the config forgot timeout.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/456-0
00:03:35.267 --> 00:03:38.809
<v Ken Prole>Right. And do you know if what,
what version we had made the change to</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/456-1
00:03:38.809 --> 00:03:39.707
<v Ken Prole>address the issue?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/458-0
00:03:40.527 --> 00:03:41.087
<v Ken Prole>I forget.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/465-0
00:03:40.997 --> 00:03:43.157
<v Mahadevan Krishnan>I think I think 3.0.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/461-0
00:03:41.087 --> 00:03:41.647
<v Ken Prole>Was it?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/478-0
00:03:46.537 --> 00:03:48.457
<v Mahadevan Krishnan>Surya, can you correct me if I'm wrong OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/475-0
00:03:47.797 --> 00:03:48.677
<v Surya Poduri>Yeah, I still don't know.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/479-0
00:03:48.677 --> 00:03:49.917
<v Surya Poduri>Yeah, it's 3.0.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/490-0
00:03:51.507 --> 00:03:55.387
<v Rahul Pande>The git config uh bit as part of the
change log was delivered.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/494-0
00:03:56.867 --> 00:03:57.507
<v Rahul Pande>In the 3.0.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/501-0
00:03:58.347 --> 00:03:59.147
<v Mahadevan Krishnan>Yep, cool.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/498-0
00:03:58.797 --> 00:03:59.197
<v Ken Prole>OK then.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/503-0
00:03:59.197 --> 00:04:00.237
<v Ken Prole>Yeah, then it wouldn't.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/519-0
00:04:00.237 --> 00:04:04.097
<v Ken Prole>It wouldn't be a 15 second for that one.
We increase the default,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/519-1
00:04:04.097 --> 00:04:06.437
<v Ken Prole>I think to to 60 or something like that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/515-0
00:04:04.817 --> 00:04:05.217
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/524-0
00:04:06.657 --> 00:04:09.377
<v Mahadevan Krishnan>Alright, so whatever the default is Ken,
sorry.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/527-0
00:04:10.177 --> 00:04:10.817
<v Ken Prole>No, no problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/538-0
00:04:10.817 --> 00:04:13.377
<v Ken Prole>Just wanted to make sure I knew what we
were looking at.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/534-0
00:04:11.857 --> 00:04:12.337
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/537-0
00:04:12.617 --> 00:04:13.617
<v Mahadevan Krishnan>All right, no problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/546-0
00:04:17.547 --> 00:04:21.387
<v Mahadevan Krishnan>So what we have observed is that it times
out after the default.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/555-0
00:04:23.427 --> 00:04:26.027
<v Mahadevan Krishnan>With config timeout is set right so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/568-0
00:04:27.787 --> 00:04:31.427
<v Mahadevan Krishnan>What we can also see Rahul,
do you have the credentials?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/573-0
00:04:32.217 --> 00:04:33.377
<v Rahul Pande>Yeah, yeah, I have that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/580-0
00:04:34.447 --> 00:04:36.687
<v Mahadevan Krishnan>And you can delete the token after this
Rende.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/584-0
00:04:36.297 --> 00:04:37.297
<v Rahul Pande>Yeah. Yeah, I will.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/587-0
00:04:37.377 --> 00:04:38.777
<v Rahul Pande>Yeah, this is a temporary one.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/603-0
00:04:39.067 --> 00:04:43.067
<v Mahadevan Krishnan>This is something that can be not able to
figure out why it happens, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/606-0
00:04:43.067 --> 00:04:44.867
<v Mahadevan Krishnan>Because the network rules are the same.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/614-0
00:04:46.307 --> 00:04:48.467
<v Mahadevan Krishnan>Obviously there is functionality
difference.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/633-0
00:04:50.227 --> 00:04:56.072
<v Mahadevan Krishnan>Between this workaround and when SRM
waits for user name and password screen</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/633-1
00:04:56.072 --> 00:04:56.907
<v Mahadevan Krishnan>to come up.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/642-0
00:04:57.187 --> 00:05:02.307
<v Mahadevan Krishnan>So when we use this in such username,
password in such an such.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/644-0
00:05:03.907 --> 00:05:03.947
<v Mahadevan Krishnan>A.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/651-0
00:05:03.947 --> 00:05:08.307
<v Mahadevan Krishnan>Such a way that it the request gets
completed.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/654-0
00:05:08.657 --> 00:05:10.177
<v Mahadevan Krishnan>Didn't listen 2 seconds.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/658-0
00:05:11.077 --> 00:05:11.397
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/661-0
00:05:11.397 --> 00:05:12.837
<v Ken Prole>Was this the what, Ryan?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/679-0
00:05:12.837 --> 00:05:17.784
<v Ken Prole>I forget on on the support there was this
how we had recommended they provide the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/679-1
00:05:17.784 --> 00:05:20.077
<v Ken Prole>URL. I think it might have been right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/691-0
00:05:19.477 --> 00:05:23.717
<v Mahadevan Krishnan>And so this was one of the workarounds
that you guys had suggested.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/694-0
00:05:24.947 --> 00:05:25.187
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/699-0
00:05:25.077 --> 00:05:25.437
<v Rahul Pande>This.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/708-0
00:05:25.187 --> 00:05:28.283
<v Ken Prole>Yeah,
I'm not sure if it's a workaround or or</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/708-1
00:05:28.283 --> 00:05:29.427
<v Ken Prole>what is required.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/716-0
00:05:30.787 --> 00:05:33.027
<v Rahul Pande>This was Surya he identified.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/714-0
00:05:31.067 --> 00:05:31.587
<v Ken Prole>Alright.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/721-0
00:05:34.507 --> 00:05:35.747
<v Rahul Pande>An alternative, Mehdi.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/722-0
00:05:37.227 --> 00:05:37.507
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/742-0
00:05:38.987 --> 00:05:43.474
<v Mahadevan Krishnan>So it is the same set of functionalities.
Perhaps that is being invoked internally</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/742-1
00:05:43.474 --> 00:05:45.907
<v Mahadevan Krishnan>in SRM in order to connect to this Git
repo.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/744-0
00:05:46.947 --> 00:05:47.307
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/758-0
00:05:47.787 --> 00:05:52.387
<v Mahadevan Krishnan>But one that succeeds in under 2 two
seconds and other that takes.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/770-0
00:05:53.947 --> 00:05:55.387
<v Mahadevan Krishnan>All the way to 60 seconds or whatever.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/774-0
00:05:55.387 --> 00:05:57.387
<v Mahadevan Krishnan>The timeout set that is set right so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/778-0
00:05:59.107 --> 00:05:59.587
<v Mahadevan Krishnan>We don't.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/786-0
00:05:59.587 --> 00:06:01.347
<v Mahadevan Krishnan>We're not able to figure out why this is
happening.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/792-0
00:06:02.267 --> 00:06:05.747
<v Mahadevan Krishnan>There are some process changes that we
had to do internally.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/818-0
00:06:06.097 --> 00:06:11.305
<v Mahadevan Krishnan>In order to communicate this way of
integrating with GitHub,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/818-1
00:06:11.305 --> 00:06:17.537
<v Mahadevan Krishnan>so that is where our hesitation is,
we need to update our documentation.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/821-0
00:06:17.537 --> 00:06:19.457
<v Mahadevan Krishnan>We need to retrain our staff in order to.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/830-0
00:06:20.817 --> 00:06:23.977
<v Mahadevan Krishnan>Connect to get in this way so that aside.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/846-0
00:06:22.957 --> 00:06:26.658
<v Rahul Pande>Also,
it doesn't provide the persistence that</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/846-1
00:06:26.658 --> 00:06:29.797
<v Rahul Pande>we won't be able to save it every time.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/851-0
00:06:29.797 --> 00:06:31.877
<v Rahul Pande>They will have to use their to clone it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/857-0
00:06:32.057 --> 00:06:34.217
<v Rahul Pande>It won't necessarily always be here.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/860-0
00:06:37.227 --> 00:06:38.827
<v Mahadevan Krishnan>Oh, you mean change the branch?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/894-0
00:06:39.867 --> 00:06:43.476
<v Rahul Pande>No, no, no, sorry.
The I I was just adding to your your</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/894-1
00:06:43.476 --> 00:06:48.760
<v Rahul Pande>thing like for example if we if if we are
using it the way username token@github.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/894-2
00:06:48.760 --> 00:06:52.627
<v Rahul Pande>com if the the URL will persist but the
token will be open.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/905-0
00:06:52.607 --> 00:06:55.647
<v Mahadevan Krishnan>Yeah, the end of the.
Also the token expires.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/908-0
00:06:55.647 --> 00:06:58.447
<v Mahadevan Krishnan>So those challenges are there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/910-0
00:06:59.987 --> 00:07:00.107
<v Mahadevan Krishnan>Ken.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/914-0
00:07:01.747 --> 00:07:02.227
<v Mahadevan Krishnan>So.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/922-0
00:07:02.317 --> 00:07:05.855
<v Ken Prole>Yeah,
I mean the the token can expire no matter</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/922-1
00:07:05.855 --> 00:07:07.477
<v Ken Prole>what, alright, I mean.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/926-0
00:07:08.477 --> 00:07:08.517
<v Mahadevan Krishnan>F.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/927-0
00:07:09.117 --> 00:07:09.757
<v Mahadevan Krishnan>No, agreed.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/931-0
00:07:09.757 --> 00:07:11.397
<v Mahadevan Krishnan>So this is something that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/939-0
00:07:13.337 --> 00:07:16.297
<v Mahadevan Krishnan>Works much faster than the default.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/938-0
00:07:15.537 --> 00:07:15.817
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/949-0
00:07:17.947 --> 00:07:20.227
<v Mahadevan Krishnan>Default mechanism that is provided by SRM.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/961-0
00:07:20.227 --> 00:07:21.827
<v Mahadevan Krishnan>So we just wanted to understand why that
SRM.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/965-0
00:07:20.907 --> 00:07:23.312
<v Ken Prole>It's not just faster.
The other one doesn't work at all.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/965-1
00:07:23.312 --> 00:07:23.987
<v Ken Prole>Is that correct?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/979-0
00:07:23.987 --> 00:07:27.867
<v Ken Prole>Or if you if you increase the timeout it
it does eventually work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/984-0
00:07:26.257 --> 00:07:29.497
<v Mahadevan Krishnan>If we increase this timeout sufficiently,
it works.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/985-0
00:07:30.317 --> 00:07:30.957
<v Ken Prole>Interesting.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1016-0
00:07:31.797 --> 00:07:37.188
<v Mahadevan Krishnan>Yeah, so so off late.
What we are seeing is that in one of our</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/992-0
00:07:32.347 --> 00:07:33.027
<v Ken Prole>Yeah, that's odd. Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1016-1
00:07:37.188 --> 00:07:41.895
<v Mahadevan Krishnan>environments,
when we increase it to two minutes it it</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1016-2
00:07:41.895 --> 00:07:42.837
<v Mahadevan Krishnan>is working.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1026-0
00:07:42.837 --> 00:07:46.185
<v Mahadevan Krishnan>So we've been working internally with our
networking team to fine tune our rules</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1026-1
00:07:46.185 --> 00:07:46.557
<v Mahadevan Krishnan>etcetera.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1043-0
00:07:47.557 --> 00:07:52.317
<v Mahadevan Krishnan>And what we've observed is that in one of
the environment which we will go to next.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1053-0
00:07:53.787 --> 00:07:55.987
<v Mahadevan Krishnan>Where the timeout is set to two minutes.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1061-0
00:07:55.987 --> 00:08:00.747
<v Mahadevan Krishnan>It works and it takes a minute and a half
to complete the authentication.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1077-0
00:08:02.587 --> 00:08:05.899
<v Ken Prole>Yeah,
I mean I I it's hard to know what might</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1077-1
00:08:05.899 --> 00:08:07.987
<v Ken Prole>be slowing things down there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1087-0
00:08:09.797 --> 00:08:12.837
<v Rahul Pande>This is the dev where timeout is not set.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1104-0
00:08:12.837 --> 00:08:17.234
<v Rahul Pande>Ken, as Mehdi was mentioning,
this is our sorry this is our dev</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1104-1
00:08:17.234 --> 00:08:21.357
<v Rahul Pande>instance where it does not connect to the
same one however.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1098-0
00:08:18.317 --> 00:08:18.517
<v Ken Prole>Mm hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1115-0
00:08:22.787 --> 00:08:25.267
<v Rahul Pande>This is our non prod so like dev test.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1142-0
00:08:25.267 --> 00:08:28.614
<v Rahul Pande>So this is our test instance close to
production.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1142-1
00:08:28.614 --> 00:08:33.567
<v Rahul Pande>This one we have the timeout setup and
and what we have observed is after</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1142-2
00:08:33.567 --> 00:08:38.387
<v Rahul Pande>putting the timeout and and working with
the networking team this this.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1186-0
00:08:38.937 --> 00:08:43.397
<v Rahul Pande>Kind of succeeds, however,
as as Mehdi mentioned this,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1186-1
00:08:43.397 --> 00:08:50.208
<v Rahul Pande>this takes much longer than if we do that
you username at at the same same host and</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1186-2
00:08:50.208 --> 00:08:54.181
<v Rahul Pande>most likely it's taking the same route.
However,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1186-3
00:08:54.181 --> 00:08:59.857
<v Rahul Pande>there is a big deficit when is one minute
50 seconds or close to two.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1195-0
00:08:59.857 --> 00:09:03.297
<v Rahul Pande>Minutes and when is under one millisecond,
I mean one second.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1199-0
00:09:03.297 --> 00:09:04.857
<v Rahul Pande>So it was 781.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1206-0
00:09:05.487 --> 00:09:06.127
<v Mahadevan Krishnan>Wait a second.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1205-0
00:09:05.587 --> 00:09:06.547
<v Rahul Pande>Milliseconds or something.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1220-0
00:09:09.617 --> 00:09:14.688
<v Ken Prole>In the is the network team able to to
understand what might be going wrong</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1220-1
00:09:14.688 --> 00:09:15.297
<v Ken Prole>there or?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1226-0
00:09:16.697 --> 00:09:17.177
<v Rahul Pande>All happening.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1229-0
00:09:16.747 --> 00:09:19.107
<v Ken Prole>Do you have any insight into what's
taking so long?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1232-0
00:09:19.547 --> 00:09:20.187
<v Ken Prole>What's that?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1247-0
00:09:20.797 --> 00:09:23.349
<v Rahul Pande>This is all happening within the. Sorry,
sorry, sorry.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1247-1
00:09:23.349 --> 00:09:25.437
<v Rahul Pande>This is all happening within the SRM
itself.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1252-0
00:09:25.437 --> 00:09:27.277
<v Rahul Pande>Yeah, the connection itself.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1262-0
00:09:27.277 --> 00:09:29.917
<v Rahul Pande>They can see that connection is going up
or or or not.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1273-0
00:09:29.917 --> 00:09:32.717
<v Rahul Pande>Surya may be able to jump in, but what?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1285-0
00:09:32.117 --> 00:09:36.157
<v Ken Prole>I mean I think SRM is just making making
calls out to the Git repo and it's taking</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1283-0
00:09:35.517 --> 00:09:36.197
<v Rahul Pande>That's right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1285-1
00:09:36.157 --> 00:09:37.277
<v Ken Prole>a long time, right? So.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1292-0
00:09:38.787 --> 00:09:39.307
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1297-0
00:09:38.827 --> 00:09:41.107
<v Rahul Pande>Yeah, like for instance,
you know how you saw this one?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1318-0
00:09:41.107 --> 00:09:44.751
<v Rahul Pande>Yeah, it took almost a minute and a half,
sort of a thing.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1318-1
00:09:44.751 --> 00:09:49.199
<v Rahul Pande>But if I put the token in here,
and if I if I if I'll show you the same</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1318-2
00:09:49.199 --> 00:09:50.187
<v Rahul Pande>same case there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1332-0
00:09:51.707 --> 00:09:57.387
<v Rahul Pande>And and what took that long would just
finish in finishing in, in, in,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1332-1
00:09:57.387 --> 00:09:59.307
<v Rahul Pande>like a jiffy. We'll see.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1340-0
00:10:00.817 --> 00:10:02.697
<v Rahul Pande>And you see it's it's just finished.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1355-0
00:10:02.767 --> 00:10:06.780
<v Rahul Pande>The same URL,
but if I remove this now for instance it</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1355-1
00:10:06.780 --> 00:10:09.407
<v Rahul Pande>it will it will take its sweet time.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1369-0
00:10:09.937 --> 00:10:13.476
<v Mahadevan Krishnan>Yeah. And also, Ken,
one of the improvements that we had</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1369-1
00:10:13.476 --> 00:10:14.097
<v Mahadevan Krishnan>suggested.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1382-0
00:10:15.617 --> 00:10:18.817
<v Mahadevan Krishnan>It may have got lost in all of the case
updates.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1399-0
00:10:18.857 --> 00:10:25.007
<v Mahadevan Krishnan>Is that with every key press on these two
fields it is sending a request back to</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1399-1
00:10:25.007 --> 00:10:27.057
<v Mahadevan Krishnan>the get report to validate.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1404-0
00:10:27.017 --> 00:10:29.857
<v Ken Prole>And it that was by design.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1411-0
00:10:30.097 --> 00:10:31.657
<v Ken Prole>We are making changes to that but.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1409-0
00:10:30.477 --> 00:10:30.717
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1423-0
00:10:33.177 --> 00:10:36.617
<v Ken Prole>That was by design.
For UX like we didn't want.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1422-0
00:10:35.897 --> 00:10:36.257
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1440-0
00:10:38.217 --> 00:10:42.005
<v Ken Prole>You know we have separate buttons that
the user would have to Click to to check</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1440-1
00:10:42.005 --> 00:10:42.337
<v Ken Prole>things.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1462-0
00:10:42.337 --> 00:10:46.357
<v Ken Prole>So we felt that most users would just be
copying pasting the URL,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1462-1
00:10:46.357 --> 00:10:50.377
<v Ken Prole>not manually typing it actually has like
a little bit of a delay.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1454-0
00:10:46.417 --> 00:10:47.417
<v Mahadevan Krishnan>Facing it. Yep.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1477-0
00:10:50.377 --> 00:10:52.328
<v Ken Prole>So if if you type at,
you know a nice speed,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1465-0
00:10:51.547 --> 00:10:51.667
<v Mahadevan Krishnan>Hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1477-1
00:10:52.328 --> 00:10:55.710
<v Ken Prole>it's it's not gonna make those requests.
Only when you pause does it make the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1475-0
00:10:54.567 --> 00:10:54.847
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1477-2
00:10:55.710 --> 00:10:56.057
<v Ken Prole>request.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1487-0
00:10:56.647 --> 00:10:58.167
<v Ken Prole>So that was March, the UX decision.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1488-0
00:10:58.167 --> 00:10:58.687
<v Ken Prole>But we are.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1500-0
00:10:58.657 --> 00:11:01.137
<v Mahadevan Krishnan>And I'll all good, all good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1496-0
00:10:58.687 --> 00:11:00.167
<v Ken Prole>We are going to make that change anyway.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1507-0
00:11:01.577 --> 00:11:03.057
<v Ken Prole>It shouldn't be causing any problems,
but yeah,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1507-1
00:11:03.057 --> 00:11:04.137
<v Ken Prole>we are looking to make that change.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1544-0
00:11:05.267 --> 00:11:09.160
<v Mahadevan Krishnan>Sure, sure, Ken.
One of the other things that you guys had</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1513-0
00:11:06.137 --> 00:11:06.737
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1544-1
00:11:09.160 --> 00:11:14.438
<v Mahadevan Krishnan>suggested is can we try and do the git
commands from the container directly and</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1544-2
00:11:14.438 --> 00:11:19.189
<v Mahadevan Krishnan>see whether there is a holdup there.
I think Surya you would be able to</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1544-3
00:11:19.189 --> 00:11:20.707
<v Mahadevan Krishnan>demonstrate that, yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1552-0
00:11:23.947 --> 00:11:26.507
<v Ken Prole>I think the conclusion there is that
there there was no hold up, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1564-0
00:11:26.987 --> 00:11:28.907
<v Mahadevan Krishnan>Yeah, there is no hold up if we.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1562-0
00:11:28.057 --> 00:11:29.137
<v Ken Prole>Yeah, I don't need to see.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1571-0
00:11:29.137 --> 00:11:32.137
<v Ken Prole>Yeah, yeah, I I,
I I don't believe you on that one.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1576-0
00:11:33.817 --> 00:11:34.057
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1581-0
00:11:34.007 --> 00:11:35.527
<v Mahadevan Krishnan>So we are happy.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1619-0
00:11:35.607 --> 00:11:39.076
<v Mahadevan Krishnan>See will you?
Do you think that the logs would be</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1619-1
00:11:39.076 --> 00:11:43.446
<v Mahadevan Krishnan>suggesting anything different in these
two separate instances,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1619-2
00:11:43.446 --> 00:11:46.568
<v Mahadevan Krishnan>one with the username,
password combination,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1619-3
00:11:46.568 --> 00:11:48.927
<v Mahadevan Krishnan>the URL and the one that does not?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1629-0
00:11:49.007 --> 00:11:52.847
<v Mahadevan Krishnan>We are happy to supply you with the logs
in these two instances.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1651-0
00:11:55.327 --> 00:11:59.380
<v Mahadevan Krishnan>Because all our network,
the network teams investigation so far is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1651-1
00:11:59.380 --> 00:12:03.797
<v Mahadevan Krishnan>that they can see connections coming
through from the container and then</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1651-2
00:12:03.797 --> 00:12:05.007
<v Mahadevan Krishnan>nothing beyond that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1659-0
00:12:08.157 --> 00:12:09.997
<v Mahadevan Krishnan>Because it's the same route that is
happening.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1670-0
00:12:08.617 --> 00:12:13.509
<v Ken Prole>And just to recapping,
what's the problem with putting the token</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1670-1
00:12:13.509 --> 00:12:14.337
<v Ken Prole>in the URL.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1672-0
00:12:15.657 --> 00:12:16.297
<v Mahadevan Krishnan>No.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1685-0
00:12:18.217 --> 00:12:22.217
<v Mahadevan Krishnan>It's user reeducation and updation of all
our internal communications.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1690-0
00:12:22.217 --> 00:12:24.017
<v Mahadevan Krishnan>All internal documentation et cetera.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1696-0
00:12:24.107 --> 00:12:25.627
<v Ken Prole>User user education.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1705-0
00:12:25.627 --> 00:12:28.227
<v Ken Prole>But they're not.
No one's been able to use this right or.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1707-0
00:12:26.527 --> 00:12:29.167
<v Mahadevan Krishnan>Yeah. So, no, no, no, no.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1724-0
00:12:29.607 --> 00:12:34.527
<v Mahadevan Krishnan>So we have over 2500 projects that are
configured in SRM.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1731-0
00:12:35.367 --> 00:12:37.767
<v Mahadevan Krishnan>So if we have to make, sorry.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1729-0
00:12:35.517 --> 00:12:36.877
<v Ken Prole>But none of them work right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1735-0
00:12:38.377 --> 00:12:39.377
<v Ken Prole>But none of them work right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1746-0
00:12:39.377 --> 00:12:42.217
<v Ken Prole>They're all they all has this work before
we're like well.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1754-0
00:12:42.517 --> 00:12:44.757
<v Mahadevan Krishnan>It works for private public repos, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1758-0
00:12:44.757 --> 00:12:46.997
<v Mahadevan Krishnan>So the problem was only for private repos.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1760-0
00:12:49.007 --> 00:12:49.367
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1769-0
00:12:52.007 --> 00:12:52.927
<v Mahadevan Krishnan>So there are a lot of.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1784-0
00:12:52.137 --> 00:12:57.341
<v Rahul Pande>I think I think if you want Mary,
as I can recap the issue for you,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1775-0
00:12:55.037 --> 00:12:55.357
<v Mahadevan Krishnan>Sorry.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1784-1
00:12:57.341 --> 00:13:00.097
<v Rahul Pande>if you want for, for and re show it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1788-0
00:13:03.477 --> 00:13:04.597
<v Mahadevan Krishnan>Sorry, what?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1793-0
00:13:05.117 --> 00:13:06.317
<v Mahadevan Krishnan>Rahul, sorry I didn't understand.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1815-0
00:13:06.737 --> 00:13:09.687
<v Rahul Pande>Sorry,
I think that I can reatticulate the the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1815-1
00:13:09.687 --> 00:13:14.583
<v Rahul Pande>issue again and and reshare the screen
and show the public and and private as</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1820-0
00:13:14.177 --> 00:13:14.937
<v Mahadevan Krishnan>Yeah, sure, sure.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1815-2
00:13:14.583 --> 00:13:14.897
<v Rahul Pande>well.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1840-0
00:13:16.177 --> 00:13:19.543
<v Mahadevan Krishnan>So Ken,
where there is private repos that are</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1840-1
00:13:19.543 --> 00:13:23.348
<v Mahadevan Krishnan>configured,
we are trying to tell them that this is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1840-2
00:13:23.348 --> 00:13:25.177
<v Mahadevan Krishnan>how you would be able to.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1845-0
00:13:27.877 --> 00:13:30.117
<v Mahadevan Krishnan>Again,
reconnect to git if that makes sense.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1855-0
00:13:33.217 --> 00:13:37.577
<v Ken Prole>Yeah, I mean, I guess whatever they,
they have their for the private repo.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1869-0
00:13:39.137 --> 00:13:45.417
<v Ken Prole>Is has not worked and is not working and
so it sounds like a fix.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1878-0
00:13:45.417 --> 00:13:48.337
<v Ken Prole>What would be to change the URL for to
make it work?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1874-0
00:13:45.727 --> 00:13:46.767
<v Mahadevan Krishnan>Also.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1890-0
00:13:49.827 --> 00:13:53.107
<v Mahadevan Krishnan>And that is what we are telling as of now,
right, So what?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1887-0
00:13:52.827 --> 00:13:53.027
<v Ken Prole>Uh huh.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1901-0
00:13:53.107 --> 00:13:57.947
<v Mahadevan Krishnan>The the other observation is that if the
and it used to work in the past, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1922-0
00:13:57.947 --> 00:14:04.376
<v Mahadevan Krishnan>And something has changed sometime
between September release of you guys and</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1922-1
00:14:04.376 --> 00:14:09.134
<v Mahadevan Krishnan>November release,
something has changed either in SRM or</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1922-2
00:14:09.134 --> 00:14:10.387
<v Mahadevan Krishnan>our side we we.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1932-0
00:14:12.257 --> 00:14:16.657
<v Mahadevan Krishnan>Some config has changed which is not
playing nicely with the Git config.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1976-0
00:14:17.087 --> 00:14:23.045
<v Mahadevan Krishnan>Right. So what we have also observed, Ken,
is that if the Git config was set up</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1940-0
00:14:19.987 --> 00:14:20.187
<v Ken Prole>Speak.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1976-1
00:14:23.045 --> 00:14:28.408
<v Mahadevan Krishnan>prior to that particular date,
then it continues to work because we are</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1976-2
00:14:28.408 --> 00:14:33.920
<v Mahadevan Krishnan>not changing the Git config and it
continues to persist with the username</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1976-3
00:14:33.920 --> 00:14:36.527
<v Mahadevan Krishnan>and password that is already saved.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1986-0
00:14:41.367 --> 00:14:44.303
<v Ken Prole>What was the date again?
You said between the September release</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1988-0
00:14:43.957 --> 00:14:45.317
<v Mahadevan Krishnan>And so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/1986-1
00:14:44.303 --> 00:14:44.487
<v Ken Prole>and.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2004-0
00:14:47.777 --> 00:14:50.633
<v Mahadevan Krishnan>September,
we started seeing this problem sometime</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2004-1
00:14:50.633 --> 00:14:52.257
<v Mahadevan Krishnan>October, November time frame.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2007-0
00:14:52.537 --> 00:14:55.257
<v Mahadevan Krishnan>So up until that time this used to work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2040-0
00:14:56.547 --> 00:14:59.894
<v Ken Prole>You know,
particular SRM version that so it sounds</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2019-0
00:14:59.427 --> 00:14:59.827
<v Mahadevan Krishnan>And.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2040-1
00:14:59.894 --> 00:15:04.947
<v Ken Prole>like you maybe maybe you're thinking that
after a an upgrade of a particular</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2040-2
00:15:04.947 --> 00:15:07.507
<v Ken Prole>version of SRM this stopped working or?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2048-0
00:15:06.787 --> 00:15:10.147
<v Mahadevan Krishnan>And that has been the that has been the
frustrating part, can we?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2063-0
00:15:10.147 --> 00:15:14.317
<v Mahadevan Krishnan>We're not able to pinpoint the exact
version of SRM from where we had started</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2063-1
00:15:14.317 --> 00:15:15.387
<v Mahadevan Krishnan>seeing this problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2098-0
00:15:16.397 --> 00:15:21.271
<v Ken Prole>I mean 'cause 'cause like one test is to
is for us to try and you know to install</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2098-1
00:15:21.271 --> 00:15:25.907
<v Ken Prole>an older version of SRM to confirm that
'cause it's either like you're saying</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2082-0
00:15:22.097 --> 00:15:22.817
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2098-2
00:15:25.907 --> 00:15:30.186
<v Ken Prole>it's either a a change that happened in
SRM or there's a change in your</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2098-3
00:15:30.186 --> 00:15:31.197
<v Ken Prole>environment that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2103-0
00:15:31.357 --> 00:15:31.997
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2115-0
00:15:32.117 --> 00:15:36.277
<v Ken Prole>That's causing things to to no longer
work that used to work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2123-0
00:15:33.607 --> 00:15:38.207
<v Mahadevan Krishnan>Yeah. And we, we,
we try to retrace all of that, right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2169-0
00:15:38.207 --> 00:15:42.219
<v Mahadevan Krishnan>We try to install an older version of SRM
to see whether it works,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2169-1
00:15:42.219 --> 00:15:47.249
<v Mahadevan Krishnan>but unfortunately there are policies that
are enforced at a Kubernetes level on our</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2169-2
00:15:47.249 --> 00:15:49.884
<v Mahadevan Krishnan>end,
which requires a particular version of</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2169-3
00:15:49.884 --> 00:15:53.777
<v Mahadevan Krishnan>kubectl and we are not able to go back to
an older version of S.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2172-0
00:15:53.777 --> 00:15:54.887
<v Mahadevan Krishnan>Due to that fact.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2213-0
00:15:56.087 --> 00:16:01.071
<v Ken Prole>I mean another option is to is to install
our our basic kind of native installer</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2213-1
00:16:01.071 --> 00:16:05.871
<v Ken Prole>that you just run on a Linux or Windows
box and it sets up everything and you</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2213-2
00:16:05.871 --> 00:16:10.487
<v Ken Prole>know you wouldn't have to worry about
Kubernetes or or anything like that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2218-0
00:16:10.927 --> 00:16:12.527
<v Mahadevan Krishnan>And that's a much bigger change.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2221-0
00:16:12.527 --> 00:16:13.527
<v Mahadevan Krishnan>Can unfortunately.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2232-0
00:16:14.217 --> 00:16:18.271
<v Ken Prole>I mean, this is just for testing purposes.
What I'm saying like just so we can know</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2232-1
00:16:18.271 --> 00:16:18.657
<v Ken Prole>whether.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2242-0
00:16:20.217 --> 00:16:22.617
<v Ken Prole>You know it's an SRM change or or
something else but.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2244-0
00:16:24.737 --> 00:16:25.217
<v Ken Prole>Anyway.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2247-0
00:16:28.437 --> 00:16:29.117
<v Ken Prole>Yeah, I mean, I don't.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2250-0
00:16:29.117 --> 00:16:29.637
<v Ken Prole>I don't know.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2251-0
00:16:29.637 --> 00:16:29.677
<v Ken Prole>I.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2258-0
00:16:29.837 --> 00:16:32.037
<v Ken Prole>I don't know of anything in SRM that
would have changed.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2262-0
00:16:33.657 --> 00:16:34.417
<v Ken Prole>Based on that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2261-0
00:16:34.947 --> 00:16:35.147
<v Mahadevan Krishnan>Mm hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2269-0
00:16:36.337 --> 00:16:38.497
<v Ken Prole>But we we we can, we can.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2284-0
00:16:38.577 --> 00:16:41.086
<v Ken Prole>We can take another,
closer look to see if,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2284-1
00:16:41.086 --> 00:16:44.337
<v Ken Prole>if anything might have been a change and
you don't know.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2295-0
00:16:44.337 --> 00:16:47.810
<v Ken Prole>You don't know what version it would have
been that it was working on and then</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2295-1
00:16:47.810 --> 00:16:48.777
<v Ken Prole>stopped working right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2300-0
00:16:48.777 --> 00:16:49.457
<v Ken Prole>Like but.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2306-0
00:16:49.777 --> 00:16:52.017
<v Mahadevan Krishnan>It would have to be an educated guess.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2305-0
00:16:51.897 --> 00:16:52.017
<v Ken Prole>Not.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2333-0
00:16:52.217 --> 00:16:58.123
<v Mahadevan Krishnan>I can't be for knowing for sure, Ken,
but we did go back in time to have a look</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2311-0
00:16:53.497 --> 00:16:53.657
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2315-0
00:16:55.177 --> 00:16:55.377
<v Ken Prole>Great.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2333-1
00:16:58.123 --> 00:17:03.217
<v Mahadevan Krishnan>at our testing records when we upgraded
from one version to another.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2343-0
00:17:04.617 --> 00:17:06.137
<v Mahadevan Krishnan>And that's what we are basing off.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2346-0
00:17:06.497 --> 00:17:08.377
<v Mahadevan Krishnan>So probably sometime around October.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2348-0
00:17:08.377 --> 00:17:09.977
<v Mahadevan Krishnan>November is when it stopped working.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2350-0
00:17:11.217 --> 00:17:11.457
<v Ken Prole>Uh huh.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2353-0
00:17:12.097 --> 00:17:13.217
<v Mahadevan Krishnan>And we had.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2372-0
00:17:14.937 --> 00:17:18.585
<v Mahadevan Krishnan>202024.6, I believe,
but I'll I'll confirm. Yeah,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2372-1
00:17:18.585 --> 00:17:21.577
<v Mahadevan Krishnan>I'll confirm based on my testing records.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2389-0
00:17:22.487 --> 00:17:25.993
<v Ken Prole>Right. And and so just you know,
when we're looking at that test earlier,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2389-1
00:17:25.993 --> 00:17:27.367
<v Ken Prole>was that a brand new project?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2399-0
00:17:27.367 --> 00:17:30.118
<v Ken Prole>So this is if you create a brand new
project in SRM,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2399-1
00:17:30.118 --> 00:17:31.727
<v Ken Prole>you're gonna have this problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2400-0
00:17:31.727 --> 00:17:32.247
<v Ken Prole>Is that correct?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2419-0
00:17:33.587 --> 00:17:37.982
<v Mahadevan Krishnan>Yeah. So usually as part of our testing,
we create a new brand,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2419-1
00:17:37.982 --> 00:17:41.827
<v Mahadevan Krishnan>new Git config and not necessarily a
brand new project.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2435-0
00:17:41.827 --> 00:17:45.731
<v Mahadevan Krishnan>Or it may be a brand new project also,
but generally the approach is we have</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2435-1
00:17:45.731 --> 00:17:48.267
<v Mahadevan Krishnan>bunch of testing projects that are
created there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2447-0
00:17:48.267 --> 00:17:53.258
<v Mahadevan Krishnan>Some of it may not have Git config set up,
and we try to create git config for those</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2447-1
00:17:53.258 --> 00:17:53.787
<v Mahadevan Krishnan>projects.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2449-0
00:17:59.317 --> 00:17:59.437
<v Ken Prole>Umm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2466-0
00:18:01.507 --> 00:18:05.891
<v Ken Prole>Is it possible to create a fresh new
project as a test right now and try and</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2465-0
00:18:05.497 --> 00:18:06.137
<v Mahadevan Krishnan>OK, sure.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2466-1
00:18:05.891 --> 00:18:06.347
<v Ken Prole>connect?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2471-0
00:18:07.617 --> 00:18:08.377
<v Mahadevan Krishnan>Yeah, I will do that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2472-0
00:18:08.377 --> 00:18:09.137
<v Mahadevan Krishnan>Rahul, can you?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2479-0
00:18:09.457 --> 00:18:12.217
<v Ken Prole>Yeah,
you don't happen to have a different.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2482-0
00:18:13.977 --> 00:18:14.137
<v Ken Prole>Repo.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2493-0
00:18:16.687 --> 00:18:18.607
<v Ken Prole>To test with, besides this test 1.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2490-0
00:18:17.847 --> 00:18:18.327
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2528-0
00:18:18.607 --> 00:18:23.150
<v Ken Prole>So just a little bit of background like I
think the way SRM works,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2528-1
00:18:23.150 --> 00:18:28.575
<v Ken Prole>it will reuse or share any git clones
that are made and so if you have multiple</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2528-2
00:18:28.575 --> 00:18:32.372
<v Ken Prole>projects in SRM that are pointing to the
same git repo,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2514-0
00:18:29.747 --> 00:18:30.187
<v Mahadevan Krishnan>Sure.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2528-3
00:18:32.372 --> 00:18:35.017
<v Ken Prole>it's going to it's going to share that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2527-0
00:18:33.887 --> 00:18:33.967
<v Mahadevan Krishnan>Mm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2533-0
00:18:35.017 --> 00:18:35.727
<v Ken Prole>It's going to reuse it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2535-0
00:18:36.397 --> 00:18:36.957
<v Mahadevan Krishnan>That's fine.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2544-0
00:18:36.997 --> 00:18:39.717
<v Mahadevan Krishnan>We'll we'll use a different in the same
org.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2539-0
00:18:38.127 --> 00:18:38.527
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2546-0
00:18:39.717 --> 00:18:40.837
<v Mahadevan Krishnan>We'll use a different repo.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2548-0
00:18:41.727 --> 00:18:42.007
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2582-0
00:18:43.927 --> 00:18:49.022
<v Rahul Pande>The other thing Mary also identified,
I'm not sure how closely related to it is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2582-1
00:18:49.022 --> 00:18:53.289
<v Rahul Pande>when it stopped working,
we started looking at that GitHub actions</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2582-2
00:18:53.289 --> 00:18:55.327
<v Rahul Pande>and the same way GitHub actions.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2574-0
00:18:53.997 --> 00:18:54.317
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2586-0
00:18:55.327 --> 00:18:56.567
<v Rahul Pande>Sorry, Maddy. You. Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2601-0
00:18:56.717 --> 00:18:58.640
<v Mahadevan Krishnan>Sorry Rahul,
but did they did confirm that it's a</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2601-1
00:18:58.640 --> 00:19:00.717
<v Mahadevan Krishnan>different functionality and they use
different? Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2606-0
00:18:59.617 --> 00:19:02.977
<v Rahul Pande>It's a different it's a different
functionality, but.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2614-0
00:19:04.687 --> 00:19:06.447
<v Rahul Pande>The repos were also coming in, of course.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2622-0
00:19:06.447 --> 00:19:09.407
<v Rahul Pande>It could be different endpoints,
but just deciding to it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2624-0
00:19:11.727 --> 00:19:12.647
<v Rahul Pande>This one is.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2626-0
00:19:14.167 --> 00:19:14.407
<v Rahul Pande>Master.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2639-0
00:19:28.917 --> 00:19:31.997
<v Rahul Pande>In the same organization,
it's a different test, not a web goat one.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2649-0
00:19:31.997 --> 00:19:33.037
<v Rahul Pande>And as Maddy mentioned.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2644-0
00:19:32.507 --> 00:19:33.107
<v Ken Prole>Yeah, yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2647-0
00:19:33.107 --> 00:19:33.507
<v Ken Prole>Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2652-0
00:19:33.507 --> 00:19:34.747
<v Ken Prole>Yeah, that was just helpful.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2653-0
00:19:34.887 --> 00:19:35.407
<v Rahul Pande>No problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2668-0
00:19:39.477 --> 00:19:42.227
<v Mahadevan Krishnan>And and can as of now,
in this particular environment,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2668-1
00:19:42.227 --> 00:19:44.677
<v Mahadevan Krishnan>I believe we have the default logging
level set.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2672-0
00:19:44.957 --> 00:19:46.557
<v Mahadevan Krishnan>I don't think trace is enabled.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2674-0
00:19:46.637 --> 00:19:47.877
<v Mahadevan Krishnan>Surya can confirm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2688-0
00:19:51.037 --> 00:19:53.949
<v Surya Poduri>No.
No traces are number here because can</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2688-1
00:19:53.949 --> 00:19:56.237
<v Surya Poduri>actually reply to add right here.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2694-0
00:19:56.707 --> 00:19:58.467
<v Ken Prole>Yeah,
I don't think we want the trace logging.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2700-0
00:19:58.467 --> 00:19:59.747
<v Ken Prole>It's just gonna be too much.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2714-0
00:20:04.877 --> 00:20:05.077
<v Surya Poduri>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2716-0
00:20:05.147 --> 00:20:05.907
<v Ken Prole>To be there.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2722-0
00:20:06.217 --> 00:20:06.337
<v Ken Prole>Umm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2723-0
00:20:07.727 --> 00:20:09.487
<v Rahul Pande>Currently Maddy I'm testing in Dev.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2728-0
00:20:09.487 --> 00:20:11.007
<v Rahul Pande>Yeah, just just.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2727-0
00:20:10.227 --> 00:20:11.067
<v Mahadevan Krishnan>Yeah, yeah, that's fine.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2744-0
00:20:19.237 --> 00:20:21.321
<v Mahadevan Krishnan>Yeah.
So this is the default get timeout in</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2736-0
00:20:20.267 --> 00:20:20.587
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2744-1
00:20:21.321 --> 00:20:22.837
<v Mahadevan Krishnan>whatever 60 seconds or whatever.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2743-0
00:20:22.657 --> 00:20:23.057
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2761-0
00:20:29.557 --> 00:20:32.599
<v Rahul Pande>And in the same, when,
as Maddy mentioned previously,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2761-1
00:20:32.599 --> 00:20:36.317
<v Rahul Pande>the public one has been working.
The only issue is with when the.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2768-0
00:20:37.757 --> 00:20:39.917
<v Rahul Pande>When the issue comes with the actual.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2780-0
00:20:41.557 --> 00:20:46.157
<v Rahul Pande>Internal or internal or or private
reproofs?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2782-0
00:20:47.307 --> 00:20:47.747
<v Ken Prole>Right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2791-0
00:20:53.807 --> 00:20:58.807
<v Rahul Pande>Yeah. So this if we look at the timing,
it's 8 seconds or.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2797-0
00:21:00.317 --> 00:21:00.477
<v Mahadevan Krishnan>Yep.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2801-0
00:21:00.517 --> 00:21:01.797
<v Rahul Pande>Millise milliseconds could be.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2805-0
00:21:02.037 --> 00:21:04.277
<v Rahul Pande>But yeah, this one,
this one is public one.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2825-0
00:21:22.507 --> 00:21:27.987
<v Ken Prole>Yeah. And so if you, if you,
if you did set the timeout longer.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2832-0
00:21:28.477 --> 00:21:30.997
<v Mahadevan Krishnan>Yeah. So we'll show.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2842-0
00:21:29.987 --> 00:21:34.947
<v Ken Prole>Then then you think it's gonna.
It sounds like it's probably gonna work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2858-0
00:21:34.947 --> 00:21:40.284
<v Ken Prole>And then the and then the the.
I guess the the question is why does it</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2858-1
00:21:40.284 --> 00:21:41.787
<v Ken Prole>take so long, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2861-0
00:21:43.057 --> 00:21:43.537
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2862-0
00:21:43.847 --> 00:21:44.287
<v Rahul Pande>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2879-0
00:21:45.327 --> 00:21:48.691
<v Ken Prole>So I mean, yeah,
I guess that's a work around,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2879-1
00:21:48.691 --> 00:21:52.127
<v Ken Prole>but it's not clear why it why it takes so
long.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2886-0
00:21:53.557 --> 00:21:54.277
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2919-0
00:21:53.627 --> 00:21:57.355
<v Ken Prole>Which is interesting that it that it
actually succeeds at all like you would</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2919-1
00:21:57.355 --> 00:22:00.648
<v Ken Prole>think. If it's not gonna work, it's,
you know, it's not gonna work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2919-2
00:22:00.648 --> 00:22:03.263
<v Ken Prole>Like I don't know why after after 2
minutes it would,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2909-0
00:22:01.657 --> 00:22:02.137
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2919-3
00:22:03.263 --> 00:22:04.667
<v Ken Prole>it would start to work right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2921-0
00:22:04.667 --> 00:22:06.027
<v Ken Prole>That that seems a little strange.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2925-0
00:22:07.677 --> 00:22:09.157
<v Mahadevan Krishnan>Yeah, because, see.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2930-0
00:22:10.637 --> 00:22:11.997
<v Mahadevan Krishnan>One the other solution here.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2951-0
00:22:13.877 --> 00:22:17.857
<v Mahadevan Krishnan>Ken is to increase the timeout to
relatively high value as per your e-mail</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2951-1
00:22:17.857 --> 00:22:19.237
<v Mahadevan Krishnan>to 10 minutes or whatever.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2953-0
00:22:20.557 --> 00:22:20.757
<v Ken Prole>Mm hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2976-0
00:22:20.997 --> 00:22:26.303
<v Mahadevan Krishnan>But that's only going to work until such
time that the endpoint is not overly busy</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2976-1
00:22:26.303 --> 00:22:28.157
<v Mahadevan Krishnan>to respond within 10 minutes.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2979-0
00:22:28.157 --> 00:22:28.997
<v Mahadevan Krishnan>I'm I'm not.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2992-0
00:22:29.037 --> 00:22:34.074
<v Mahadevan Krishnan>I can't think of a scenario where GitHub
is now drawing going to respond for 10</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2992-1
00:22:34.074 --> 00:22:35.837
<v Mahadevan Krishnan>minutes, but that certainly.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/2994-0
00:22:37.857 --> 00:22:38.777
<v Mahadevan Krishnan>Could work.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3014-0
00:22:40.437 --> 00:22:46.122
<v Mahadevan Krishnan>For those scenarios where we don't go
ahead and change those configs where we</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3014-1
00:22:46.122 --> 00:22:49.037
<v Mahadevan Krishnan>have username password added to the URL.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3016-0
00:22:50.107 --> 00:22:51.107
<v Ken Prole>Right, right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3041-0
00:22:52.587 --> 00:22:55.518
<v Ken Prole>And it may be just a slowness at the,
you know,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3041-1
00:22:55.518 --> 00:22:58.267
<v Ken Prole>the first first time or first
configuration.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3049-0
00:22:56.477 --> 00:23:00.997
<v Mahadevan Krishnan>Yeah. So this, no,
this lowness happens twice.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3053-0
00:23:01.037 --> 00:23:02.837
<v Mahadevan Krishnan>Actually not observation so far.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3090-0
00:23:02.837 --> 00:23:08.977
<v Mahadevan Krishnan>One is to resolve and present with the
user name and password iframe and then</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3090-1
00:23:08.977 --> 00:23:14.880
<v Mahadevan Krishnan>once you are providing the userman
password it also take additional minute</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3090-2
00:23:14.880 --> 00:23:19.997
<v Mahadevan Krishnan>and 1/2 or so in order to start the
process uploading et cetera.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3092-0
00:23:21.057 --> 00:23:21.257
<v Ken Prole>Mm hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3096-0
00:23:22.917 --> 00:23:23.957
<v Ken Prole>Yeah, I mean, it's just.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3115-0
00:23:23.957 --> 00:23:28.175
<v Ken Prole>It's just really strange that it would.
It would succeed at all, you know,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3115-1
00:23:28.175 --> 00:23:31.437
<v Ken Prole>like there's there's it doesn't really
make sense, right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3151-0
00:23:31.437 --> 00:23:35.043
<v Ken Prole>Like if it's,
if it's gonna fail and time out then then</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3151-1
00:23:35.043 --> 00:23:40.388
<v Ken Prole>it it should do that fast if it's but if
it's you know if you increase the timeout</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3124-0
00:23:35.147 --> 00:23:35.627
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3151-2
00:23:40.388 --> 00:23:45.347
<v Ken Prole>and then it's it's working that indicates
it's just slow to respond to those</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3151-3
00:23:45.347 --> 00:23:46.957
<v Ken Prole>requests for some reason.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3153-0
00:23:47.627 --> 00:23:47.987
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3155-0
00:23:54.637 --> 00:23:55.037
<v Ken Prole>Meow.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3173-0
00:24:00.017 --> 00:24:04.445
<v Ken Prole>And I guess there's some firewall or
proxy that this is going through that</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3173-1
00:24:04.445 --> 00:24:04.977
<v Ken Prole>might be.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3180-0
00:24:05.857 --> 00:24:08.337
<v Ken Prole>Filtering things or slowing things down
in some way.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3191-0
00:24:11.497 --> 00:24:12.417
<v Mahadevan Krishnan>But then it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3186-0
00:24:11.577 --> 00:24:12.057
<v Rahul Pande>I think so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3192-0
00:24:11.797 --> 00:24:12.437
<v Ken Prole>Like I I don't.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3212-0
00:24:12.437 --> 00:24:17.248
<v Ken Prole>I also explain the timeout like I don't
like you know it's it's it's working,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3205-0
00:24:16.437 --> 00:24:17.077
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3212-1
00:24:17.248 --> 00:24:20.517
<v Ken Prole>it's working but it's just taking a long
time right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3224-0
00:24:20.517 --> 00:24:25.597
<v Ken Prole>And I don't know how anything on the SRM
side would cause that to be a problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3231-0
00:24:25.597 --> 00:24:27.477
<v Ken Prole>Like it's just it's just making requests
and.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3237-0
00:24:28.807 --> 00:24:30.727
<v Ken Prole>Waiting for the response and.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3258-0
00:24:33.307 --> 00:24:36.347
<v Rahul Pande>In the same way,
if we put that username and password it</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3245-0
00:24:33.977 --> 00:24:34.497
<v Ken Prole>Yes.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3258-1
00:24:36.347 --> 00:24:37.947
<v Rahul Pande>it works very quickly as well.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3266-0
00:24:37.947 --> 00:24:39.187
<v Rahul Pande>So there is that scenario.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3269-0
00:24:38.647 --> 00:24:41.527
<v Ken Prole>Yeah, I understand. I understand. Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3288-0
00:24:42.937 --> 00:24:46.537
<v Rahul Pande>And Surya can probably help you
understand a bit more in terms of the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3288-1
00:24:46.537 --> 00:24:49.314
<v Rahul Pande>network hops,
what are in between and you also raised</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3288-2
00:24:49.314 --> 00:24:49.777
<v Rahul Pande>his hand.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3290-0
00:24:49.777 --> 00:24:50.957
<v Rahul Pande>Surya, sorry ow to you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3313-0
00:24:54.467 --> 00:24:58.343
<v Surya Poduri>No,
I just wanted to ask and is there any</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3313-1
00:24:58.343 --> 00:25:04.987
<v Surya Poduri>timeline that you specify in the JD like
in the SRM within your SRM UI?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3321-0
00:25:11.267 --> 00:25:14.467
<v Ken Prole>Any timeout for the UI itself you're
saying?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3322-0
00:25:14.277 --> 00:25:14.877
<v Surya Poduri>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3330-0
00:25:19.307 --> 00:25:23.107
<v Ken Prole>Nothing that you would see here like this
is all just.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3338-0
00:25:24.627 --> 00:25:26.347
<v Ken Prole>On the connection to the the Git stuff.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3355-0
00:25:29.367 --> 00:25:32.384
<v Ken Prole>You know the you know we're we're not
running into anything else.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3355-1
00:25:32.384 --> 00:25:34.807
<v Ken Prole>The session timeout and stuff like that,
that's all.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3368-0
00:25:35.997 --> 00:25:37.397
<v Surya Poduri>Yeah, I was wondering like when?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3371-0
00:25:36.267 --> 00:25:38.467
<v Ken Prole>Also configurable but but you would you
would see that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3392-0
00:25:39.387 --> 00:25:42.031
<v Surya Poduri>Yeah,
I was wondering when I was when we were</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3392-1
00:25:42.031 --> 00:25:46.400
<v Surya Poduri>able to provide or pass these an MND,
the token phrase in the URL directly,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3392-2
00:25:46.400 --> 00:25:48.067
<v Surya Poduri>then the connection is quick.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3394-0
00:25:49.717 --> 00:25:49.797
<v Surya Poduri>So.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3406-0
00:25:52.837 --> 00:25:55.877
<v Surya Poduri>I understand that you guys are using Ajit
Pay initials provider, right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3408-0
00:25:55.877 --> 00:25:57.717
<v Surya Poduri>So is there any way?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3422-0
00:26:02.287 --> 00:26:06.783
<v Surya Poduri>Maybe it's directly connected to the pray
way to reposteries that say plus point</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3422-1
00:26:06.783 --> 00:26:07.727
<v Surya Poduri>there in the git.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3431-0
00:26:09.197 --> 00:26:11.997
<v Surya Poduri>When we are providing reason 1 password
but without that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3446-0
00:26:13.877 --> 00:26:19.037
<v Surya Poduri>Then I think Git will actually validate
first whenever a request comes to it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3460-0
00:26:20.957 --> 00:26:25.077
<v Surya Poduri>Where the whether it has to,
you know authenticate it or not right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3467-0
00:26:25.917 --> 00:26:30.197
<v Surya Poduri>So I think that authentication is
actually taking the time so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3481-0
00:26:31.187 --> 00:26:35.085
<v Surya Poduri>If you're passing the username password
directly in the URL so that our</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3481-1
00:26:35.085 --> 00:26:36.547
<v Surya Poduri>organization is very quick.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3486-0
00:26:39.277 --> 00:26:40.677
<v Surya Poduri>I'm I'm trying to understand.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3487-0
00:26:39.927 --> 00:26:40.407
<v Ken Prole>Gotcha.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3489-0
00:26:41.827 --> 00:26:42.387
<v Surya Poduri>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3491-0
00:26:45.397 --> 00:26:45.477
<v Surya Poduri>So.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3493-0
00:26:48.687 --> 00:26:48.807
<v Surya Poduri>Umm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3510-0
00:26:50.587 --> 00:26:56.707
<v Surya Poduri>Is there somewhere in the UI itself like
or in the libraries that you're using?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3524-0
00:26:58.117 --> 00:27:01.757
<v Surya Poduri>That actually because now you're waiting
for the git config.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3537-0
00:27:01.757 --> 00:27:05.037
<v Surya Poduri>So when we prod the Git config timeout,
that is 2 minutes here.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3547-0
00:27:05.637 --> 00:27:10.558
<v Surya Poduri>So that is actually helping get to
actually respond and authenticate back.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3547-1
00:27:10.558 --> 00:27:11.477
<v Surya Poduri>Is that right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3563-0
00:27:13.277 --> 00:27:16.207
<v Surya Poduri>I mean,
like I don't why where this timeout is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3563-1
00:27:16.207 --> 00:27:18.077
<v Surya Poduri>actually connected to your UI.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3574-0
00:27:20.067 --> 00:27:22.507
<v Surya Poduri>How will this actually helping trend
understand?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3584-0
00:27:23.307 --> 00:27:28.069
<v Surya Poduri>But when we're not providing this,
so BT's actually taking time to respond</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3584-1
00:27:28.069 --> 00:27:28.387
<v Surya Poduri>back.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3590-0
00:27:29.387 --> 00:27:31.387
<v Surya Poduri>And then it is finally getting timeout.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3592-0
00:27:33.397 --> 00:27:33.877
<v Surya Poduri>So.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3602-0
00:27:36.617 --> 00:27:39.577
<v Surya Poduri>The way we communicate to the git,
maybe that is where.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3611-0
00:27:41.277 --> 00:27:44.277
<v Surya Poduri>Something that we can improve in the UI
or?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3632-0
00:27:46.317 --> 00:27:52.398
<v Surya Poduri>Or maybe at the I'm trying to figure out
whether it's at the at the Kubernetes end</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3632-1
00:27:52.398 --> 00:27:54.157
<v Surya Poduri>or at the at the UI end.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3672-0
00:28:00.187 --> 00:28:03.002
<v Ken Prole>Yeah,
I mean it it it seems like at at the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3672-1
00:28:03.002 --> 00:28:07.781
<v Ken Prole>point where it's trying to connect to git
like that's already, you know,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3672-2
00:28:07.781 --> 00:28:11.448
<v Ken Prole>the operations already started kind of on
the back end.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3672-3
00:28:11.448 --> 00:28:16.227
<v Ken Prole>And so I wouldn't think the UI would
would come into play at that point.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3674-0
00:28:19.847 --> 00:28:20.327
<v Ken Prole>But.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3676-0
00:28:22.027 --> 00:28:22.107
<v Ken Prole>Uh.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3683-0
00:28:24.547 --> 00:28:25.507
<v Ken Prole>Anyway, yeah, this is.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3694-0
00:28:25.507 --> 00:28:29.387
<v Ken Prole>This is providing some good information
that we can work with some other folks on.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3691-0
00:28:27.947 --> 00:28:28.267
<v Surya Poduri>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3697-0
00:28:32.067 --> 00:28:32.667
<v Ken Prole>And.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3700-0
00:28:32.847 --> 00:28:33.687
<v Mahadevan Krishnan>Can we?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3727-0
00:28:34.007 --> 00:28:38.243
<v Mahadevan Krishnan>Will we send you the logs for both the
environments which we have used in</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3704-0
00:28:34.547 --> 00:28:34.707
<v Ken Prole>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3727-1
00:28:38.243 --> 00:28:41.506
<v Mahadevan Krishnan>testing today?
One that shows that it is able to connect</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3721-0
00:28:40.347 --> 00:28:40.787
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3727-2
00:28:41.506 --> 00:28:43.567
<v Mahadevan Krishnan>and then the other it is timing out?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3754-0
00:28:46.757 --> 00:28:51.235
<v Mahadevan Krishnan>You also mentioned that you know you are
having a relook at that particular screen</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3754-1
00:28:51.235 --> 00:28:53.717
<v Mahadevan Krishnan>where it validates the git config,
et cetera.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3762-0
00:28:53.757 --> 00:28:57.797
<v Mahadevan Krishnan>So any idea when that is likely to be
relooked into?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3752-0
00:28:54.577 --> 00:28:54.777
<v Ken Prole>Mm hmm.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3770-0
00:28:59.777 --> 00:29:02.401
<v Ken Prole>Yeah,
it's currently planned for next feature</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3770-1
00:29:02.401 --> 00:29:02.857
<v Ken Prole>release.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3772-0
00:29:04.897 --> 00:29:05.137
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3775-0
00:29:06.667 --> 00:29:07.907
<v Ken Prole>Yeah, so in June.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3778-0
00:29:08.717 --> 00:29:09.117
<v Mahadevan Krishnan>All Co.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3783-0
00:29:09.117 --> 00:29:10.197
<v Mahadevan Krishnan>All good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3785-0
00:29:10.047 --> 00:29:10.687
<v Ken Prole>Yeah, yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3802-0
00:29:10.197 --> 00:29:15.875
<v Mahadevan Krishnan>Just a suggestion from our side,
if we can replicate the same behavior or</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3802-1
00:29:15.875 --> 00:29:18.637
<v Mahadevan Krishnan>the UI as the GitHub actions screen.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3809-0
00:29:20.037 --> 00:29:22.037
<v Mahadevan Krishnan>To us, that was much more use of.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3838-0
00:29:24.437 --> 00:29:29.331
<v Mahadevan Krishnan>Workable in our context because the user
name and password is not mandatory for</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3838-1
00:29:29.331 --> 00:29:34.409
<v Mahadevan Krishnan>public repos and you can just press enter
when you are done with providing all the</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3838-2
00:29:34.409 --> 00:29:34.837
<v Mahadevan Krishnan>inputs.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3841-0
00:29:34.837 --> 00:29:36.717
<v Mahadevan Krishnan>But again, I'll leave it with you guys.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3845-0
00:29:37.717 --> 00:29:38.717
<v Ken Prole>Yeah, I know that makes sense.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3847-0
00:29:40.587 --> 00:29:41.107
<v Ken Prole>Makes sense?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3849-0
00:29:42.787 --> 00:29:43.107
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3872-0
00:29:43.107 --> 00:29:47.538
<v Ken Prole>So yeah. So we'll,
we'll look into this further at from what</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3872-1
00:29:47.538 --> 00:29:52.987
<v Ken Prole>I'm understanding is it seemed like this
problem started at at some point.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3906-0
00:29:54.097 --> 00:29:58.667
<v Mahadevan Krishnan>Yeah, we we observe it in November.
So we may have done an upgrade in</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3881-0
00:29:54.827 --> 00:29:55.907
<v Ken Prole>And yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3906-1
00:29:58.667 --> 00:30:01.866
<v Mahadevan Krishnan>September, October, September.
If I'm not wrong,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3906-2
00:30:01.866 --> 00:30:05.457
<v Mahadevan Krishnan>there was a feature release or some sort
at that time.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3902-0
00:30:04.707 --> 00:30:05.067
<v Ken Prole>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3928-0
00:30:05.527 --> 00:30:10.539
<v Ken Prole>Look into that like it might be possible
that the underlying J Git library was</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3928-1
00:30:10.539 --> 00:30:15.487
<v Ken Prole>upgraded and and for whatever reason that
caused things to have this problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3925-0
00:30:14.097 --> 00:30:14.457
<v Surya Poduri>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3944-0
00:30:15.487 --> 00:30:20.589
<v Ken Prole>So we'll take a look at that and yeah,
and then it seems like, you know,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3934-0
00:30:18.067 --> 00:30:18.427
<v Mahadevan Krishnan>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3944-1
00:30:20.589 --> 00:30:22.407
<v Ken Prole>increasing the timeout is.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3955-0
00:30:23.857 --> 00:30:26.697
<v Ken Prole>An option,
but you know it's it's odd that it would.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3954-0
00:30:26.297 --> 00:30:26.737
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3977-0
00:30:26.697 --> 00:30:31.477
<v Ken Prole>It would require that long adding the
your you know the token in the URL as an</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3962-0
00:30:29.177 --> 00:30:29.497
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3977-1
00:30:31.477 --> 00:30:34.079
<v Ken Prole>option,
although that's not perfect either</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3977-2
00:30:34.079 --> 00:30:36.257
<v Ken Prole>because you'd have to change things.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/3980-0
00:30:37.037 --> 00:30:37.477
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4003-0
00:30:37.287 --> 00:30:40.539
<v Ken Prole>And then the other option is something I
mention in the e-mail,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4003-1
00:30:40.539 --> 00:30:43.487
<v Ken Prole>which is to to send the source outside of
this mechanism.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4042-0
00:30:43.487 --> 00:30:46.564
<v Ken Prole>So rather than rather than SRM making
that request,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4001-0
00:30:43.917 --> 00:30:44.397
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4042-1
00:30:46.564 --> 00:30:49.582
<v Ken Prole>you know you probably already have your,
you know,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4042-2
00:30:49.582 --> 00:30:54.317
<v Ken Prole>CI pipeline or other pipeline in place
that you're you're pulling the source as</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4025-0
00:30:52.627 --> 00:30:53.187
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4042-3
00:30:54.317 --> 00:30:58.518
<v Ken Prole>part of your builds and testing.
You can send the source directly from</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4042-4
00:30:58.518 --> 00:31:00.057
<v Ken Prole>there which which I point.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4048-0
00:31:00.057 --> 00:31:01.887
<v Ken Prole>In the e-mail has a lot of other.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4058-0
00:31:02.617 --> 00:31:06.377
<v Ken Prole>Advantages over this approach to pulling
in source?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4060-0
00:31:07.487 --> 00:31:08.287
<v Ken Prole>You know that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4068-0
00:31:09.147 --> 00:31:11.107
<v Mahadevan Krishnan>We'll explore that, Ken.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4064-0
00:31:09.777 --> 00:31:10.097
<v Ken Prole>You know.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4098-0
00:31:11.307 --> 00:31:16.887
<v Mahadevan Krishnan>So far, the way we are so as I said,
there are 2000 plus projects and we have</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4069-0
00:31:12.457 --> 00:31:12.577
<v Ken Prole>You.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4098-1
00:31:16.887 --> 00:31:22.754
<v Mahadevan Krishnan>relied on a script to manually update the
Git config as in when we start creating</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4098-2
00:31:22.754 --> 00:31:23.827
<v Mahadevan Krishnan>these projects.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4126-0
00:31:25.377 --> 00:31:31.347
<v Mahadevan Krishnan>We'll have to slightly change the way Git
is referenced or the source code is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4126-1
00:31:31.347 --> 00:31:36.017
<v Mahadevan Krishnan>referenced in SRM if we are going to
populate it via the CI.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4128-0
00:31:37.737 --> 00:31:38.057
<v Mahadevan Krishnan>Let me.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4143-0
00:31:38.327 --> 00:31:43.533
<v Mahadevan Krishnan>Explore that possibility and see how much
of additional disruption that would cause</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4143-1
00:31:43.533 --> 00:31:43.967
<v Mahadevan Krishnan>in the.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4153-0
00:31:45.697 --> 00:31:47.577
<v Mahadevan Krishnan>Ci Steps, so leave that with me.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4156-0
00:31:46.747 --> 00:31:47.747
<v Ken Prole>Sure, sure.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4155-0
00:31:47.577 --> 00:31:48.497
<v Mahadevan Krishnan>Let me have a look at it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4160-0
00:31:49.297 --> 00:31:49.857
<v Ken Prole>Yeah, cool.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4179-0
00:31:49.857 --> 00:31:51.874
<v Ken Prole>Yeah,
I'm just putting it out there as as as an</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4172-0
00:31:51.577 --> 00:31:52.377
<v Mahadevan Krishnan>No. Understood.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4179-1
00:31:51.874 --> 00:31:54.817
<v Ken Prole>option and the other option,
which I think was mentioned was the SSH.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4185-0
00:31:54.817 --> 00:31:56.457
<v Ken Prole>I don't know if that would work better.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4191-0
00:31:56.417 --> 00:31:57.057
<v Mahadevan Krishnan>No, I.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4219-0
00:31:56.457 --> 00:31:59.759
<v Ken Prole>I understand that that's not so easy to
make that adjustment,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4198-0
00:31:59.197 --> 00:31:59.517
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4219-1
00:31:59.759 --> 00:32:04.232
<v Ken Prole>but that is also that mean I think that's
what is a common way of authenticating is</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4208-0
00:32:00.447 --> 00:32:01.007
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4219-2
00:32:04.232 --> 00:32:05.457
<v Ken Prole>through is through SSH.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4223-0
00:32:04.397 --> 00:32:05.237
<v Mahadevan Krishnan>Let's do it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4239-0
00:32:05.997 --> 00:32:09.103
<v Mahadevan Krishnan>Yeah,
we we only have approval for usage over</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4239-1
00:32:09.103 --> 00:32:12.277
<v Mahadevan Krishnan>HTTPS,
although one could argue that you know.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4261-0
00:32:13.817 --> 00:32:18.567
<v Mahadevan Krishnan>It is still encrypted if it is over SSH
and we should not have a problem in</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4261-1
00:32:18.567 --> 00:32:19.817
<v Mahadevan Krishnan>getting it endorsed.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4276-0
00:32:20.137 --> 00:32:24.925
<v Mahadevan Krishnan>But we have to go through a design
approval first, followed by if I will,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4276-1
00:32:24.925 --> 00:32:26.737
<v Mahadevan Krishnan>rules, et cetera, et cetera.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4281-0
00:32:26.737 --> 00:32:29.097
<v Mahadevan Krishnan>So that is something we are happy to look
into.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4292-0
00:32:29.687 --> 00:32:33.927
<v Mahadevan Krishnan>But would would need some time as well in
getting the approvals.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4315-0
00:32:33.647 --> 00:32:35.805
<v Ken Prole>Yeah,
I think it's normally considered more</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4315-1
00:32:35.805 --> 00:32:39.581
<v Ken Prole>secure. But yeah, I understand. What?
What you know what's been approved and</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4305-0
00:32:37.847 --> 00:32:38.127
<v Mahadevan Krishnan>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4315-2
00:32:39.581 --> 00:32:40.807
<v Ken Prole>what's not been approved.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4326-0
00:32:40.927 --> 00:32:43.494
<v Ken Prole>It's not so easy to to make those kinds
of changes, but yeah,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4326-1
00:32:43.494 --> 00:32:44.447
<v Ken Prole>just just throwing out.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4330-0
00:32:43.827 --> 00:32:45.307
<v Mahadevan Krishnan>Yeah, no.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4347-0
00:32:44.447 --> 00:32:48.504
<v Ken Prole>There is another another option.
If if we can't get any further with this</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4335-0
00:32:45.307 --> 00:32:45.667
<v Mahadevan Krishnan>All good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4342-0
00:32:45.667 --> 00:32:46.747
<v Mahadevan Krishnan>All good, I understood.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4347-1
00:32:48.504 --> 00:32:49.327
<v Ken Prole>other stuff so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4354-0
00:32:50.817 --> 00:32:51.617
<v Ken Prole>Yeah. So yeah, definitely.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4378-0
00:32:51.617 --> 00:32:54.851
<v Ken Prole>This is really,
really helpful and sorry that this has</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4378-1
00:32:54.851 --> 00:32:58.203
<v Ken Prole>been going on for so long and and well,
yeah, we'll get,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4372-0
00:32:56.277 --> 00:32:57.837
<v Mahadevan Krishnan>I appreciate your help, Ken.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4378-2
00:32:58.203 --> 00:33:00.497
<v Ken Prole>we'll get to the bottom of it. So yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4381-0
00:33:00.637 --> 00:33:01.477
<v Mahadevan Krishnan>Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4389-0
00:33:01.517 --> 00:33:02.957
<v Mahadevan Krishnan>Thanks. I will send the logs through.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4393-0
00:33:02.027 --> 00:33:04.267
<v Ken Prole>All right. OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4396-0
00:33:02.957 --> 00:33:05.529
<v Mahadevan Krishnan>Yeah.
Anything else can you would like to know</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4396-1
00:33:05.529 --> 00:33:06.077
<v Mahadevan Krishnan>as of now?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4401-0
00:33:07.047 --> 00:33:07.807
<v Ken Prole>No, I think this is.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4405-0
00:33:07.807 --> 00:33:08.407
<v Ken Prole>This is great.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4407-0
00:33:08.407 --> 00:33:09.287
<v Ken Prole>I really appreciate it.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4410-0
00:33:09.737 --> 00:33:11.097
<v Mahadevan Krishnan>All right, all good, all good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4415-0
00:33:11.097 --> 00:33:12.457
<v Mahadevan Krishnan>And the team all good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4416-0
00:33:11.587 --> 00:33:12.627
<v Surya Poduri>Thanks again thanks.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4418-0
00:33:15.117 --> 00:33:16.157
<v Rahul Pande>Thank you all good.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4420-0
00:33:17.017 --> 00:33:17.377
<v Mahadevan Krishnan>All right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4423-0
00:33:17.377 --> 00:33:18.377
<v Mahadevan Krishnan>Thanks everyone.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4426-0
00:33:18.377 --> 00:33:20.137
<v Mahadevan Krishnan>Thanks Ryan for setting this up. Cheers.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4428-0
00:33:20.877 --> 00:33:20.957
<v Ken Prole>Me.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4431-0
00:33:21.877 --> 00:33:23.037
<v Ken Prole>Cheers. Thank you. Bye.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4436-0
00:33:23.337 --> 00:33:24.017
<v Karen Ho>Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4439-0
00:33:25.027 --> 00:33:25.867
<v SangJu Lee>Thank everyone.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4441-0
00:33:25.987 --> 00:33:26.657
<v SangJu Lee>Bye bye.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4450-0
00:33:27.087 --> 00:33:28.927
<v Qing Li>Thank you, Kim. Thank you all.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4449-0
00:33:27.957 --> 00:33:29.157
<v Ryan Park>Thank you, Ken.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4452-0
00:33:30.167 --> 00:33:30.927
<v Ken Prole>Yeah, no problem.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4456-0
00:33:37.197 --> 00:33:37.357
<v Qing Li>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4458-0
00:33:38.427 --> 00:33:38.747
<v Qing Li>Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4460-0
00:33:38.747 --> 00:33:39.867
<v Qing Li>Right. Bye for now.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4471-0
00:33:41.337 --> 00:33:44.857
<v Ryan Park>Oh yeah, that is a good meeting because.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4464-0
00:33:41.347 --> 00:33:41.667
<v Qing Li>I think.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4469-0
00:33:43.187 --> 00:33:43.547
<v Qing Li>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4481-0
00:33:46.747 --> 00:33:48.707
<v Ryan Park>Identify that that is not easy.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4484-0
00:33:50.987 --> 00:33:51.307
<v Ryan Park>Easy, easy.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4490-0
00:33:52.027 --> 00:33:52.707
<v Qing Li>Yes.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4488-0
00:33:52.187 --> 00:33:53.227
<v Ryan Park>That is not easy case.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4497-0
00:33:53.227 --> 00:33:55.307
<v Ryan Park>So they understand the situations.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4508-0
00:33:55.667 --> 00:34:00.787
<v Qing Li>Yes, yes, I think it is very necessary,
but do do they have the old version?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4531-0
00:34:00.827 --> 00:34:06.393
<v Qing Li>So do you have like any case reference to
the older version so that we can tell Ken,</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4531-1
00:34:06.393 --> 00:34:09.667
<v Qing Li>I guess Noel right?
Like I just checked the case.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4542-0
00:34:09.397 --> 00:34:14.008
<v Ryan Park>You you mean that that the engine already
mentioned that old version don't have</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4542-1
00:34:14.008 --> 00:34:14.757
<v Ryan Park>these issues?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4555-0
00:34:14.757 --> 00:34:21.157
<v Ryan Park>So they're I think that they are at
Apple's today, this woman.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4547-0
00:34:14.967 --> 00:34:15.567
<v Qing Li>Right.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4557-0
00:34:23.187 --> 00:34:23.507
<v Ryan Park>At post.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4561-0
00:34:24.907 --> 00:34:25.547
<v Ryan Park>This issue.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4570-0
00:34:27.467 --> 00:34:30.027
<v Ryan Park>Raised on 2024 that nine for that.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4577-0
00:34:30.027 --> 00:34:35.387
<v Ryan Park>So I think that 2024 match version maybe.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4581-0
00:34:36.867 --> 00:34:37.827
<v Ryan Park>There are there are no issues.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4584-0
00:34:37.827 --> 00:34:40.947
<v Ryan Park>So the I I guess.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4609-0
00:34:42.667 --> 00:34:50.098
<v Ryan Park>2020 for March 4 is maybe working well,
but at first time they raise the this</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4609-1
00:34:50.098 --> 00:34:53.147
<v Ryan Park>issue in SRM 20249.4 version so.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4611-0
00:34:53.497 --> 00:34:54.057
<v Ryan Park>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4614-0
00:34:55.127 --> 00:34:55.607
<v Qing Li>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4620-0
00:34:55.887 --> 00:34:57.167
<v Qing Li>So we still can.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4622-0
00:34:56.347 --> 00:34:58.787
<v Ryan Park>Bajajung baby works? Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4624-0
00:34:59.677 --> 00:35:00.317
<v Qing Li>Yeah. OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4630-0
00:35:01.797 --> 00:35:03.957
<v Qing Li>20249 version right?</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4639-0
00:35:05.207 --> 00:35:09.407
<v Ryan Park>Yeah. Prog 9 was issue happens. Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4641-0
00:35:09.377 --> 00:35:10.457
<v Qing Li>OK, OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4642-0
00:35:10.867 --> 00:35:11.027
<v Ryan Park>Yeah.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4644-0
00:35:12.757 --> 00:35:13.077
<v Ryan Park>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4647-0
00:35:13.077 --> 00:35:13.877
<v Ryan Park>Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4656-0
00:35:14.037 --> 00:35:14.997
<v Qing Li>Yeah. Thank you.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4660-0
00:35:15.357 --> 00:35:17.837
<v Qing Li>Collect the logs, then get to Chen.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4655-0
00:35:15.427 --> 00:35:16.347
<v Ryan Park>Yeah. Bye, bye.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4670-0
00:35:17.837 --> 00:35:20.477
<v Qing Li>Yeah, we'll see what happens,
but I think it will.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4673-0
00:35:20.717 --> 00:35:22.797
<v Qing Li>Maybe we need another call later.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4680-0
00:35:25.477 --> 00:35:25.797
<v Qing Li>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4677-0
00:35:25.537 --> 00:35:25.777
<v Ryan Park>OK.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4679-0
00:35:25.777 --> 00:35:26.697
<v Ryan Park>Thank you. Bye bye.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4684-0
00:35:27.067 --> 00:35:27.867
<v Qing Li>Yeah. Bye for now.</v>

9f30d60e-e160-4571-80eb-7a69413b5cb2/4704-0
00:36:20.797 --> 00:36:20.917
<v Ryan Park>Hmm.</v>